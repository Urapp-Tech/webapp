import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useCallback, useEffect, useState } from 'react';
import CategoriesCard from '../../components/common/CategoriesCard';
import Loader from '../../components/common/Loader';
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

function getCategoryClasses(isActive: boolean) {
  const classes = 'item';

  if (isActive) {
    return `${classes} active shadow-lg`;
  }
  return classes;
}
const colorArray = [
  '#e1ccec',
  '#dfd3c3',
  '#c8d9eb',
  'rgba(200, 217, 223, 0.956863)',
  'rgba(217, 217, 217, 0.956863)',
  '#ffe2e2',
];

function HomePage() {
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

  const cartData = useAppSelector((state) => state.cartState.cartData);

  const dispatch = useAppDispatch();

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
      subCategoryTrigger(categoryData.data[0].id);
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
    fetchAnonymousCart();
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
          onClick={(id: string) => subCategoryTrigger(id)}
        />
      );
    }
    return <div>Error Occurred</div>;
  }, [categoryData, isCategoryLoading, subCategoryTrigger]);

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

      <div className="px-4 pt-6 sm:px-5 sm:pt-4 xl:px-7">
        <div className="all-categories">
          <h4 className="heading">Categories</h4>
          {categoryList()}
        </div>
        <div className="selected-categories">
          <div className="mb-4 items-center justify-between sm:flex">
            <h4 className="heading">{subCategoryData?.data?.name}</h4>
            <FormControl className="search-sub-cats">
              <Input
                className="field"
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
          <div className="categories-list">
            {isSubCategoryLoading ? (
              <Loader />
            ) : (
              filteredSubCategory.map((item: any) => (
                <div key={item.id} className="item">
                  <img
                    className="mb-4 aspect-[4/3] w-full object-contain md:mb-6"
                    src={item.icon}
                    alt=""
                  />
                  <div className="flex flex-wrap items-center justify-between">
                    <h5 className="name">{item.name}</h5>
                    <h6 className="price">$ {item.price.toFixed(2)}</h6>
                    <Button
                      className="btn-add"
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

export default HomePage;
