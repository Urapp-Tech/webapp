import { HighlightOff, Loop } from '@mui/icons-material';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Branch, GetBranchesResponse } from '../interfaces/branch';
import { login } from '../redux/features/authStateSlice';
import { setBranch, setIsBranchSingle } from '../redux/features/branchSlice';
import { resetCart, setCartData } from '../redux/features/cartStateSlice';
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks';
import cartService, { UpdateCartPayload } from '../services/cart.service';
import network from '../services/network';
import { SystemConfigData } from '../types/app.types';
import API_PATHS from '../utilities/API-PATHS';
import cn from '../utilities/class-names';
import { getItem } from '../utilities/local-storage';
import promiseHandler from '../utilities/promise-handler';

function LoadingBranchesComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Loop className="h-16 w-16 animate-spin text-primary" />
      <h1 className="mt-4 text-2xl font-semibold text-primary">
        Loading branches...
      </h1>
      <p className="mt-2 text-primary">
        Please wait while we fetch the available branches.
      </p>
    </div>
  );
}

function BranchesErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <HighlightOff className="h-12 w-12 text-red-500" />
      <h1 className="mt-4 text-2xl font-semibold text-primary">
        Error Loading Branches
      </h1>
      <p className="text-muted-foreground mt-2 max-w-md text-center">
        We encountered an error while fetching the branches. This could be due
        to a network issue or a problem with the server.
      </p>
      <p className="text-destructive mt-2 text-sm">{error.message}</p>

      <Button
        onClick={reset}
        type="button"
        variant="contained"
        className="text-normal mt-4 w-[120px] bg-black py-[14px] text-[14px] leading-[normal] text-white"
      >
        Try Again
      </Button>
    </div>
  );
}

function SelectBranchComponent({ branches }: { branches: Array<Branch> }) {
  const user = useAppSelector((state) => state.authState.user);
  const systemConfig = useAppSelector((state) => state.appState.systemConfig);
  const { cartData } = useAppSelector((state) => state.cartState);
  const userAddress = useAppSelector((state) => state.deviceStates.addressList);
  const tenantConfig = useAppSelector(
    (state) => state.deviceStates.tenantConfig
  );

  const dispatch = useAppDispatch();
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const logo = useMemo(() => {
    if (!systemConfig) {
      return null;
    }
    return systemConfig.tenantConfig.logo;
  }, [systemConfig]);

  const emptyCart = async () => {
    dispatch(resetCart());
    if (!cartData?.id) {
      return;
    }
    const pickupDateTime = dayjs(new Date()).toISOString();
    const dropDateTime = dayjs(pickupDateTime)
      .add(tenantConfig?.minimumDeliveryTime ?? 3, 'day')
      .toISOString();
    const tempAddress = userAddress[0] ? userAddress[0].id : null;

    const updateCartPayload: UpdateCartPayload = {
      appUser: user?.id,
      appUserAddress: tempAddress,
      appUserDevice: cartData?.appUserDevice,
      cartId: cartData?.id,
      dropDateTime,
      pickupDateTime,
      voucherCode: '',
      tenant: cartData?.tenant,
      products: [],
    };

    const updateCartPromise = cartService.updateCart(updateCartPayload);

    const [updateCartResult, updateCartError] =
      await promiseHandler(updateCartPromise);
    if (updateCartResult?.data?.success) {
      dispatch(setCartData(updateCartResult.data?.data?.cart));
    }
  };

  const confirmSelection = async () => {
    const branch = branches.find((b) => b.id === selectedBranch);
    if (user) {
      const tokenResult = await network.post(API_PATHS.createToken(), {
        tenant: branch?.tenant,
        branch: branch?.id,
        user: user.id,
      });
      const userData = {
        ...user,
        token: tokenResult.data.data,
      };
      dispatch(login(userData));
    }
    dispatch(setBranch(branch));
    await emptyCart();
  };

  return (
    <div className="relative mx-auto min-h-screen w-screen overflow-hidden p-4">
      <div className="absolute -right-[calc(50%-75vh)] top-[calc(50%-70vh)] -z-50 aspect-square h-[140vh] rounded-full bg-background" />
      {logo ? (
        <img
          src={logo}
          alt=""
          className="mx-4 mb-10 h-auto w-32 object-contain"
        />
      ) : null}
      <h1 className="mb-6 text-center text-2xl font-bold">
        Select a branch to continue.
      </h1>
      {/* gap-8 sm:grid-cols-2 lg:grid-cols-4 */}
      <div className="mx-4 grid grid-cols-1 gap-8 ">
        {branches.map((branch) => (
          <div key={branch.id} className="flex items-center justify-center">
            <button
              type="button"
              className={cn(
                'min-h-24 w-96 cursor-pointer rounded-lg bg-white px-6 py-4 shadow-md transition-all',
                selectedBranch === branch.id &&
                  'scale-105 shadow-lg ring-2 ring-primary'
              )}
              onClick={() => setSelectedBranch(branch.id)}
            >
              <div className="flex items-center ">
                <div className="grow text-start text-2xl font-semibold">
                  {branch.name}
                </div>
                <div className="flex justify-center ">
                  {/* <Store className="h-16 w-16 text-primary" /> */}
                  {logo ? (
                    <img
                      src={logo}
                      alt=""
                      className="min-w-20 h-auto w-20 object-contain"
                    />
                  ) : null}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="w-full max-w-xs cursor-pointer rounded-md bg-black px-4 py-2 text-white transition-all hover:bg-black/80"
          disabled={!selectedBranch}
          onClick={confirmSelection}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
}

function WithBranch({ children }: { children: React.ReactNode }) {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<GetBranchesResponse | null>(null);
  const [error, setError] = useState<any>(null);
  const isBranchSelected = useAppSelector(
    (state) => state.branchState.isBranchSelected
  );
  const dispatch = useAppDispatch();

  const getBranches = async () => {
    if (isBranchSelected) {
      return;
    }

    setIsPending(true);
    try {
      const systemConfig = getItem<SystemConfigData>('SYSTEM_CONFIG');
      if (!systemConfig) {
        throw new Error('no system config');
      }
      const result = await network.get<GetBranchesResponse>(
        API_PATHS.getBranches(systemConfig.tenant.id)
      );
      setData(result.data);
      setIsPending(false);
    } catch (netError) {
      setError(netError);
      setIsPending(false);
      throw error;
    }
  };

  useEffect(() => {
    if (!data) getBranches();
  }, [isBranchSelected]);

  useEffect(() => {
    if (!data) return;
    dispatch(setIsBranchSingle(false));
    if (data.data.list.length === 1) {
      const [branch] = data.data.list;
      dispatch(setBranch(branch));
      dispatch(setIsBranchSingle(true));
    }
  }, [data]);

  if (isPending) return <LoadingBranchesComponent />;

  if (error && !isBranchSelected)
    return (
      <BranchesErrorComponent
        error={error}
        reset={() => {
          window.location.reload();
        }}
      />
    );

  if (data && !data.success && !isBranchSelected)
    return (
      <BranchesErrorComponent
        error={new Error(data.message)}
        reset={() => {
          window.location.reload();
        }}
      />
    );

  if (data && !isBranchSelected) {
    return <SelectBranchComponent branches={data.data.list} />;
  }

  return children;
}

export default WithBranch;
