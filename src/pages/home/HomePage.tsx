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
import { getCart } from '../../redux/features/cartStateSlice';
import { setDeviceData } from '../../redux/features/deviceState';
import { useAppDispatch } from '../../redux/redux-hooks';

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
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [subCategory, setSubCategory] = useState<any>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [filteredSubCategory, setFilteredSubCategory] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const client = new ClientJS();
  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [FAQs, setFAQs] = useState(null);
  const fingerprint = client.getFingerprint();
  const agent = client.getUserAgent();
  const [isLoading, setIsLoading] = useState(false);

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
    const faqPromise = categoryService.faqService(subCategory?.id, item.id);
    const [result, error] = await promiseHandler(faqPromise);
    if (!result) {
      console.error('error :>> ', error);
      return;
    }
    if (result.data.success) {
      setFAQs(result.data.data.homeCatItemFaq);
    }
  };
  const onClickButton = (item: any) => {
    categoryService.subCategory(item.id).then((response) => {
      setSubCategory(response.data.data);
    });
  };
  useEffect(() => {
    setIsLoading(true);
    const persistedDeviceData: any = getItem('DEVICE_DATA');
    if (persistedDeviceData) {
      dispatch(setDeviceData(persistedDeviceData));
    }

    fetchIp().then((ip) => {
      const nameValue = `${agent.slice(0, 11)}-${ip}-${fingerprint}`;
      if (persistedDeviceData === null) {
        tenantService
          .getTenantConfig()
          .then((response) => {
            tenantService
              .deviceRegistration({
                deviceId: fingerprint.toString(),
                deviceType: 'Android',
                isNotificationAllowed: true,
                name: nameValue,
                tenant: response.data.data.id,
                token: 'undefined',
              })
              .then((newResponse) => {
                dispatch(setDeviceData(newResponse.data.data));
                cartService
                  .anonymousCart({
                    tenant: newResponse.data.data?.tenant,
                    appUserDevice: newResponse.data.data?.id,
                  })
                  .then((cartResponse) => {
                    dispatch(getCart(cartResponse.data.data.cart));
                  })
                  .catch((error) => {
                    setAlertMsg(error.message);
                    setShowAlert(true);
                    setAlertSeverity('error');
                  });
              })
              .catch((error) => {
                setAlertMsg(error.message);
                setShowAlert(true);
                setAlertSeverity('error');
              });
          })
          .catch((error) => {
            setAlertMsg(error.message);
            setShowAlert(true);
            setAlertSeverity('error');
          });
      }
    });
    categoryService
      .categoryList()
      .then((response) => {
        setIsLoading(false);
        onClickButton(response.data.data[0]);
        setSelectedCategory(response.data.data);
      })
      .catch((error) => {
        setAlertMsg(error.message);
        setShowAlert(true);
        setAlertSeverity('error');
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when the API call completes (success or error)
      });
  }, [agent, dispatch, fingerprint]);
  const searchSubCategory = useCallback(() => {
    if (!searchName) {
      setFilteredSubCategory(subCategory.homeCatItems);
    } else {
      const filteredItems = subCategory.homeCatItems.filter((item: any) => {
        const priceString = item?.price?.toString() || '';
        return (
          item.name.toLowerCase().includes(searchName.toLowerCase()) ||
          priceString.includes(searchName)
        );
      });
      setFilteredSubCategory(filteredItems);
    }
  }, [searchName, subCategory]);

  useEffect(() => {
    if (subCategory?.homeCatItems?.length > 0) {
      searchSubCategory();
    }
  }, [searchSubCategory, subCategory]);
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
          <CategoriesCard
            categories={selectedCategory}
            onClick={onClickButton}
          />
        </div>
        <div className="selected-categories">
          <div className="mb-4 items-center justify-between sm:flex">
            <h4 className="heading">{subCategory?.name}</h4>
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
            {filteredSubCategory.map((item: any) => (
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
            ))}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default HomePage;
