import { HighlightOff, Loop, Store } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Branch, GetBranchesResponse } from '../interfaces/branch';
import { login } from '../redux/features/authStateSlice';
import { setBranch, setIsBranchSingle } from '../redux/features/branchSlice';
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks';
import network from '../services/network';
import { SystemConfigData } from '../types/app.types';
import API_PATHS from '../utilities/API-PATHS';
import cn from '../utilities/class-names';
import { getItem } from '../utilities/local-storage';

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
  const dispatch = useAppDispatch();
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const confirmSelection = async () => {
    const branch = branches.find((b) => b.id === selectedBranch);
    if (user) {
      const tokenResult = await network.post(API_PATHS.createToken, {
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
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-center text-2xl font-bold">Select a Branch</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {branches.map((branch) => (
          <button
            type="button"
            key={branch.id}
            className={cn(
              '`cursor-pointer rounded-md ring-2 ring-gray-400 transition-all hover:shadow-md',
              selectedBranch === branch.id &&
                'scale-105 shadow-lg ring-2 ring-primary hover:shadow-none'
            )}
            onClick={() => setSelectedBranch(branch.id)}
          >
            <div>
              <div className="p-6 text-center text-2xl font-semibold">
                {branch.name}
              </div>
            </div>
            <div className="flex justify-center p-6 pt-0">
              <Store className="h-16 w-16 text-primary" />
            </div>
            <div className="flex justify-center p-6 pt-0">
              {selectedBranch === branch.id && (
                <div className="text-sm font-semibold text-primary">
                  Selected
                </div>
              )}
            </div>
          </button>
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

function WithBranch({ children }: any) {
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
    getBranches();
  }, []);

  useEffect(() => {
    dispatch(setIsBranchSingle(false));
    if (data && data.data.list.length === 1) {
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
