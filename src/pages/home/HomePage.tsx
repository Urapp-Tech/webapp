import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import axios from 'axios';
import { ClientJS } from 'clientjs';
import { useCallback, useEffect, useState } from 'react';
import CategoriesCard from '../../components/common/CategoriesCard';
import AlertBox from '../../components/common/SnackBar';
import { setCartData } from '../../redux/features/cartStateSlice';
import { setDeviceData } from '../../redux/features/deviceState';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

import Loader from '../../components/common/Loader';
import {
  useGetAllCategoryQuery,
  useLazyGetSubCategoryQuery,
} from '../../redux/features/categorySliceAPI';
import categoryService from '../../services/Category';
import cartService from '../../services/cart';
import tenantService from '../../services/tenant';
import { getItem } from '../../utilities/local-storage';
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
  const persistedDeviceData = useAppSelector(
    (state) => state.deviceStates.deviceData
  );
  const dispatch = useAppDispatch();
  const client = new ClientJS();
  const fingerprint = client.getFingerprint();
  const agent = client.getUserAgent();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [filteredSubCategory, setFilteredSubCategory] = useState<any[]>([]);
  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [FAQs, setFAQs] = useState(null);

  const { isLoading: isCategoryLoading, data: categoryData } =
    useGetAllCategoryQuery('');

  const [subCategoryTrigger, subCategoryResult] = useLazyGetSubCategoryQuery();

  const { isLoading: isSubCategoryLoading, data: subCategoryData } =
    subCategoryResult;

  useEffect(() => {
    if (!isCategoryLoading && categoryData && categoryData.success) {
      subCategoryTrigger(categoryData.data[0].id);
      return;
    }
    setShowAlert(true);
    setAlertSeverity('error');
  }, [isCategoryLoading, categoryData, subCategoryTrigger]);

  async function fetchIp() {
    const url = new URL('https://api.ipify.org');
    url.searchParams.append('format', 'json');
    const ipPromise = axios.get(url.toString());
    const [result, error] = await promiseHandler(ipPromise);
    if (!result) {
      setAlertMsg('Error Occurred');
      setShowAlert(true);
      setAlertSeverity('error');
      return null;
    }
    return result.data.ip;
  }

  const addItemHandler = async (item: any) => {
    setSelectedItem(item);
    setDialogOpen(true);
    const faqPromise = categoryService.faqService(subCategoryData?.id, item.id);
    const [result, error] = await promiseHandler(faqPromise);
    if (!result) {
      console.error('error :>> ', error);
      return;
    }
    if (result.data.success) {
      setFAQs(result.data.data.homeCatItemFaq);
    }
  };

  useEffect(() => {
    if (persistedDeviceData) {
      dispatch(setDeviceData(persistedDeviceData));
    }

    fetchIp().then((ip) => {
      const nameValue = `${agent.slice(0, 11)}-${ip}-${fingerprint}`;
      if (persistedDeviceData === null) {
        tenantService
          .getTenantConfig()
          .then((tenantConfigResponse) =>
            tenantService.deviceRegistration({
              deviceId: fingerprint.toString(),
              deviceType: 'Web',
              isNotificationAllowed: true,
              name: nameValue,
              tenant: tenantConfigResponse.data.data.id,
              token:
                'Push notifications are not available on the web platform.',
            })
          )
          .then((deviceRegistrationResponse) => {
            dispatch(setDeviceData(deviceRegistrationResponse.data.data));
          })
          .catch((error) => {
            setAlertMsg(error.message);
            setShowAlert(true);
            setAlertSeverity('error');
          });
      }
    });
  }, [agent, dispatch, fingerprint, persistedDeviceData]);

  useEffect(() => {
    if (!persistedDeviceData) {
      return;
    }
    cartService
      .anonymousCart({
        tenant: persistedDeviceData?.tenant,
        appUserDevice: persistedDeviceData?.id,
      })
      .then((cartResponse) => {
        if (cartResponse.data.success) {
          dispatch(setCartData(cartResponse.data.data.cart));
        }
      })
      .catch((error) => {
        setAlertMsg(error.message);
        setShowAlert(true);
        setAlertSeverity('error');
      });
  }, [dispatch, persistedDeviceData]);

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
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverity={alertSeverity}
          alertOpen={showAlert}
          setAlertOpen={setShowAlert}
        />
      )}
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
