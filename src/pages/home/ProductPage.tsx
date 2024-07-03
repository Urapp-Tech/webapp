import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoriesCard from '../../components/common/CategoriesCard';
import Loader from '../../components/common/Loader';
import ProductOfferSwiper from '../../components/common/ProductOfferSwiper';
import AlertBox from '../../components/common/SnackBar';
import useAlert from '../../hooks/alert.hook';
import { setCartData, setCartItems } from '../../redux/features/cartStateSlice';
import {
  useGetAllCategoryQuery,
  useLazyGetSubCategoryQuery,
} from '../../redux/features/categorySliceAPI';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import cartService from '../../services/cart.service';
import categoryService from '../../services/category.service';
import promiseHandler from '../../utilities/promise-handler';
import HomePagePopup from './HomePagePopup';
import { fetchBanners } from '../../redux/features/bannerSlice';
import { CURRENCY_PREFIX } from '../../utilities/constant';

function getCategoryClasses(isActive: boolean) {
  const classes = 'item';

  if (isActive) {
    return `${classes} active shadow-lg`;
  }
  return classes;
}

const colorArray = [
  '#E1CCEC',
  '#DFD3C3',
  '#C8D9EB',
  'rgba(200, 217, 223, 0.956863)',
  'rgba(217, 217, 217, 0.956863)',
  '#FFE2E2',
];

function ProductPage() {
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const persistedDeviceData = useAppSelector(
    (state) => state.deviceStates.deviceData
  );

  const user = useAppSelector((state) => state.authState.user);
  const { banners } = useAppSelector((s) => s.bannerState);

  const cartData = useAppSelector((state) => state.cartState.cartData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [filteredSubCategory, setFilteredSubCategory] = useState<Array<any>>(
    []
  );
  const [FAQs, setFAQs] = useState(null);

  const { isLoading: isCategoryLoading, data: categoryData } =
    useGetAllCategoryQuery('');

  const [subCategoryTrigger, subCategoryResult] = useLazyGetSubCategoryQuery();

  const { isLoading: isSubCategoryLoading, data: subCategoryData } =
    subCategoryResult;

  useEffect(() => {
    if (!isCategoryLoading && categoryData && categoryData.success) {
      subCategoryTrigger({ menuId: categoryData.data[0].id });
    }
  }, [isCategoryLoading, categoryData, subCategoryTrigger]);

  const addItemHandler = async (item: any) => {
    setSelectedItem(item);
    setDialogOpen(true);
    const faqPromise = categoryService.faqService(
      subCategoryData?.data.id,
      item.id
    );
    const [faqResult, faqError] = await promiseHandler(faqPromise);
    if (!faqResult) {
      console.error('error :>> ', faqError);
      return;
    }
    if (!faqResult.data.success) {
      console.error('error :>> ', faqResult.data.message);
      return;
    }
    setFAQs(faqResult.data.data.homeCatItemFaq);
  };

  useEffect(() => {
    async function fetchAnonymousCart() {
      if (!persistedDeviceData) {
        return;
      }
      const getAnonymousCartPromise = cartService.anonymousCart({
        tenant: persistedDeviceData?.tenant,
        appUserDevice: persistedDeviceData?.id,
      });
      const [getAnonymousCartResult, getAnonymousCartError] =
        await promiseHandler(getAnonymousCartPromise);
      if (!getAnonymousCartResult) {
        setAlertSeverity('error');
        setAlertMessage(getAnonymousCartError.message);
        setShowAlert(true);
        return;
      }
      if (!getAnonymousCartResult.data.success) {
        setAlertSeverity('error');
        setAlertMessage(getAnonymousCartResult.data.message);
        setShowAlert(true);
        return;
      }
      dispatch(setCartData(getAnonymousCartResult.data.data.cart));
      dispatch(setCartItems(getAnonymousCartResult.data.data.cartItems));
    }
    fetchAnonymousCart().then();
  }, [persistedDeviceData]);

  useEffect(() => {
    if (user && !persistedDeviceData && !cartData) {
      cartService
        .userCart()
        .then((cartResponse) => {
          if (cartResponse.data.success) {
            dispatch(setCartData(cartResponse.data.data.cart));
            dispatch(setCartItems(cartResponse.data.data.cartItems));
          }
        })
        .catch((error) => {
          setAlertSeverity('error');
          setAlertMessage(error.message);
          setShowAlert(true);
        });
    }
  }, [cartData, dispatch, persistedDeviceData, user]);

  useEffect(() => {
    if (subCategoryData?.data?.homeCatItems?.length > 0) {
      if (!searchName) {
        setFilteredSubCategory(subCategoryData?.data?.homeCatItems);
        return;
      }
      const filteredItems = subCategoryData?.data?.homeCatItems.filter(
        (item: any) => {
          const priceString = item?.price?.toString() || '';
          return (
            item.name.toLowerCase().includes(searchName.toLowerCase()) ||
            priceString.includes(searchName)
          );
        }
      );
      setFilteredSubCategory(filteredItems);
    }
  }, [searchName, subCategoryData]);

  const categoryList = useCallback(() => {
    if (isCategoryLoading) {
      return <Loader />;
    }
    if (categoryData && categoryData.success) {
      return (
        <CategoriesCard
          categories={categoryData.data}
          onClick={(id: string) => subCategoryTrigger({ menuId: id })}
        />
      );
    }
    return <div>Error Occurred</div>;
  }, [categoryData, isCategoryLoading, subCategoryTrigger]);

  useEffect(() => {
    if (banners.length === 0) {
      dispatch(fetchBanners());
    }
  }, []);

  return (
    <>
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
      <HomePagePopup
        open={dialogOpen}
        setOpen={setDialogOpen}
        data={selectedItem}
        FAQs={FAQs}
      />

      {user &&
        user.id &&
        banners &&
        banners.filter((x) => x.bannerType === 'Slider').length !== 0 && (
          <div className="mb-10 grid grid-cols-12 bg-background px-4 pt-6 sm:px-5 sm:pt-4 xl:px-7">
            <div className="col-span-12">
              <h4 className="mb-5 text-2xl font-semibold leading-tight text-secondary sm:mb-7 md:text-[1.375rem] md:font-bold">
                Offers
              </h4>
              <ProductOfferSwiper banners={banners} />
            </div>
          </div>
        )}

      <div className="bg-background px-4 pt-6 sm:px-5 sm:pt-4 xl:px-7">
        <div className="all-categories mb-8">
          <h4 className="my-5 text-2xl font-semibold leading-tight text-secondary sm:mb-7  md:font-semibold">
            Categories
          </h4>
          {categoryList()}
        </div>
        <div>
          <div className="mb-4 items-center justify-between sm:flex">
            <h4 className="mb-4 text-2xl font-semibold leading-tight text-secondary sm:mb-0">
              {subCategoryData?.data?.name}
            </h4>
            <FormControl className="w-full max-w-[350px] rounded-[0.625rem] bg-white shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
              <Input
                className="m-0 gap-x-3 px-5 py-2 text-sm font-normal text-faded"
                id="search"
                type="text"
                inputProps={{
                  placeholder: 'Search',
                }}
                disableUnderline
                endAdornment={<SearchOutlinedIcon />}
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </FormControl>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {isSubCategoryLoading ? (
              <Loader />
            ) : (
              filteredSubCategory.map((item: any) => (
                <div
                  key={item.id}
                  className="relative rounded-[0.625rem] bg-white px-2.5 pb-2.5 pt-4 md:px-3.5 md:pt-5"
                >
                  <div>
                    <button
                      type="button"
                      aria-label="Navigate"
                      onClick={() =>
                        navigate(`../detail/${item.id}`, {
                          state: {
                            menuId: item.homeCategory,
                            itemId: item.id,
                          },
                        })
                      }
                    >
                      <img
                        className="mb-4 aspect-[4/3] w-full cursor-pointer object-contain md:mb-6"
                        src={item.icon}
                        alt=""
                      />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between">
                    <h5 className="mb-2 basis-full text-center text-base font-semibold leading-none text-secondary sm:mb-3 sm:text-left">
                      {item.name}
                    </h5>
                    <h6 className="mb-3 flex-1 basis-full text-center text-base font-semibold text-secondary sm:mb-0 sm:flex sm:basis-0 sm:text-left">
                      {CURRENCY_PREFIX} {item.price.toFixed(2)}
                    </h6>
                    <Button
                      className="btn-add w-full rounded-[0.625rem] bg-primary text-sm font-semibold text-foreground sm:w-auto"
                      variant="contained"
                      endIcon={<ShoppingBagOutlinedIcon />}
                      onClick={() => addItemHandler(item)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
