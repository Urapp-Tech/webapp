import { zodResolver } from '@hookform/resolvers/zod';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import noLocation from '../../assets/images/icon-noMapLocation.svg';
import Loader from '../../components/common/Loader';
import Map from '../../components/common/Map';
import AlertBox from '../../components/common/SnackBar';
import useAlert from '../../hooks/alert.hook';
import {
  deleteUserAddress,
  setAddressStatus,
  setUserAddressList,
  setUserNewAddress,
} from '../../redux/features/deviceState';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import addressService from '../../services/address.service';
import {
  UpdateAddressStatusData,
  UserAddressData,
} from '../../types/address.types';
import loadGoogleMaps from '../../utilities/load-google-maps';
import promiseHandler from '../../utilities/promise-handler';
import DeleteAddressPopup from './DeleteAddressPopup';

const addNewAddressSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'name is required' })
    .regex(/^[a-zA-Z].*$/, 'name must begin with letter'),
  location: z.string().min(1, { message: 'location is required' }),
  type: z.enum(['Home', 'Office', 'Other']),
});

type AddNewAddressType = z.infer<typeof addNewAddressSchema>;
type AddNewAddressErrors = Partial<
  Record<keyof AddNewAddressType, { message: string; type: string }>
>;

const formOptions = { resolver: zodResolver(addNewAddressSchema) };

const typeData = [
  {
    name: 'location',
    img: <HomeOutlinedIcon />,
    type: 'Home',
  },
  {
    name: 'location',
    img: <WorkOutlineOutlinedIcon />,
    type: 'Office',
  },
  {
    name: 'location',
    img: <LocationOnOutlinedIcon />,
    type: 'Other',
  },
] as const;

function NoLocationAvailable() {
  return (
    <div className="no-map-location">
      <div className="content">
        <div className="icon">
          <img className="w-100" src={noLocation} alt="" />
        </div>
        <h4 className="text">Location not available</h4>
      </div>
    </div>
  );
}

function NoLocationFound() {
  return (
    <div
      className="header"
      style={{
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
      }}
    >
      <span className="title">No Location Found </span>
    </div>
  );
}

function MapHeader({
  center,
  handleMarkerDragEnd,
}: {
  center: google.maps.LatLngLiteral;
  handleMarkerDragEnd: (newPosition: google.maps.LatLngLiteral) => void;
}) {
  return (
    <div className="header" style={{ height: '600px' }}>
      <Map center={center} zoom={15} handleDragged={handleMarkerDragEnd} />
    </div>
  );
}

function DeliveryAddressPage() {
  const { handleSubmit, getValues, setValue, control } =
    useForm<AddNewAddressType>(formOptions);

  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const addressList = useAppSelector((state) => state.deviceStates.addressList);
  const user = useAppSelector((state) => state.authState.user);
  const [delAddress, setDelAddress] = useState<boolean>(false);
  const [location, setLocation] = useState({
    lat: addressList.at(0)?.latitude ?? 0,
    lng: addressList.at(0)?.longitude ?? 0,
  });
  const [activeAddress, setActiveAddress] =
    useState<UpdateAddressStatusData | null>(null);
  const [addressObj, setAddressObj] = useState<UserAddressData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteItem, setDeleteItem] = useState<UserAddressData | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getUserAddress() {
      setIsLoading(true);
      const getUserAddressPromise = addressService.getUserAddress();
      const [getUserAddressResult, getUserAddressError] = await promiseHandler(
        getUserAddressPromise
      );
      setIsLoading(false);
      if (!getUserAddressResult) {
        setAlertSeverity('error');
        setAlertMessage(getUserAddressError.message);
        setShowAlert(true);
        return;
      }
      if (!getUserAddressResult.data.success) {
        setAlertSeverity('error');
        setAlertMessage(getUserAddressResult.data.message);
        setShowAlert(true);
        return;
      }

      dispatch(setUserAddressList(getUserAddressResult.data.data));
      const tempActiveAddress = getUserAddressResult.data.data.find(
        (item) => item.isActive
      );
      if (tempActiveAddress) {
        setActiveAddress(tempActiveAddress);
      }
    }
    getUserAddress().then();
  }, []);

  const handleAddressClick = async (index: number) => {
    const selectedAddress = addressList[index];
    setAddressObj(selectedAddress);
    setValue('location', selectedAddress.address);
    setValue('type', selectedAddress.type as 'Home' | 'Office' | 'Other');
    setLocation({
      lat: selectedAddress.latitude,
      lng: selectedAddress.longitude,
    });
    const updateAddressStatusPromise = addressService.updateAddressStatus(
      selectedAddress.id
    );
    const [updateAddressStatusResult, updateAddressStatusError] =
      await promiseHandler(updateAddressStatusPromise);

    if (!updateAddressStatusResult) {
      setAlertSeverity('error');
      setAlertMessage(updateAddressStatusError.message);
      setShowAlert(true);
      return;
    }
    if (!updateAddressStatusResult.data.success) {
      setAlertSeverity('error');
      setAlertMessage(updateAddressStatusResult.data.message);
      setShowAlert(true);
      return;
    }
    setActiveAddress(updateAddressStatusResult.data.data);
    dispatch(setAddressStatus(updateAddressStatusResult.data.data));
  };

  const handleMarkerDragEnd = useCallback(
    (newPosition: google.maps.LatLngLiteral) => {
      setLocation(newPosition);
      loadGoogleMaps().then((google) => {
        const geocoder = new google.Geocoder();
        geocoder.geocode(
          { location: newPosition },
          (
            result: Array<google.maps.GeocoderResult> | null,
            status: google.maps.GeocoderStatus
          ) => {
            if (status === google.GeocoderStatus.OK) {
              if (result && result[0]) {
                setValue('location', result[0].formatted_address);
              }
            }
          }
        );
      });
    },
    []
  );

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          loadGoogleMaps().then((google) => {
            const latLng = new google.LatLng(latitude, longitude);
            const geocoder = new google.Geocoder();
            geocoder.geocode(
              { location: latLng },
              (
                results: Array<google.maps.GeocoderResult> | null,
                status: google.maps.GeocoderStatus
              ) => {
                if (
                  status === google.GeocoderStatus.OK &&
                  results &&
                  results[0]
                ) {
                  const formattedAddress = results[0].formatted_address;
                  setLocation({
                    lat: latitude,
                    lng: longitude,
                  });
                  setValue('location', formattedAddress);
                } else {
                  setAlertSeverity('error');
                  setAlertMessage(status);
                  setShowAlert(true);
                }
              }
            );
          });
        },
        (error) => {
          setAlertSeverity('error');
          setAlertMessage(error.message);
          setShowAlert(true);
        }
      );
    } else {
      setAlertSeverity('error');
      setAlertMessage('Geolocation is not supported by this browser.');
      setShowAlert(true);
    }
  };

  const onAddressChange = (value: string) => {
    loadGoogleMaps().then((google) => {
      const geocoder = new google.Geocoder();
      if (value) {
        geocoder.geocode({ address: value }, (results: any, status: any) => {
          if (status === google.GeocoderStatus.OK) {
            if (results && results[0]) {
              const newPosition = results[0].geometry.location.toJSON();
              handleMarkerDragEnd(newPosition);
            }
          }
        });
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onAddressChange(getValues('location'));
    }, 1500);

    return () => clearTimeout(timer);
  }, [getValues('location')]);

  const addNewAddressError = (errors: any) => {
    const typedErrors = errors as AddNewAddressErrors;
    if (typedErrors.name && typedErrors.name.message) {
      setAlertSeverity('error');
      setAlertMessage(typedErrors.name.message);
      setShowAlert(true);
      return;
    }
    if (typedErrors.location && typedErrors.location.message) {
      setAlertSeverity('error');
      setAlertMessage(typedErrors.location.message);
      setShowAlert(true);
      return;
    }
    if (typedErrors.type) {
      setAlertSeverity('error');
      setAlertMessage('type is required');
      setShowAlert(true);
    }
  };

  const addNewAddress = async (data: AddNewAddressType | any) => {
    const addUserAddressPromise = addressService.addUserAddress({
      address: data.location,
      latitude: location.lat,
      longitude: location.lng,
      name: data.name,
      type: data.type,
    });
    const [addUserAddressResult, addUserAddressError] = await promiseHandler(
      addUserAddressPromise
    );
    if (!addUserAddressResult) {
      setAlertSeverity('error');
      setAlertMessage(addUserAddressError.message);
      setShowAlert(true);
      return;
    }
    if (!addUserAddressResult.data.success) {
      setAlertSeverity('error');
      setAlertMessage(addUserAddressResult.data.message);
      setShowAlert(true);
      return;
    }
    dispatch(setUserNewAddress(addUserAddressResult.data.data));
  };

  const handleDelete = async () => {
    const tempDeleteItemId: string | null = deleteItem ? deleteItem.id : null;
    if (!tempDeleteItemId) {
      setAlertSeverity('error');
      setAlertMessage('Delete Id Not Set');
      setShowAlert(true);
      return;
    }
    const deleteUserAddressPromise =
      addressService.deleteUserAddress(tempDeleteItemId);

    const [deleteUserAddressResult, deleteUserAddressError] =
      await promiseHandler(deleteUserAddressPromise);
    if (!deleteUserAddressResult) {
      setAlertSeverity('error');
      setAlertMessage(deleteUserAddressError.message);
      setShowAlert(true);
      return;
    }
    if (!deleteUserAddressResult.data.success) {
      setAlertSeverity('error');
      setAlertMessage(deleteUserAddressResult.data.message);
      setShowAlert(true);
      return;
    }
    dispatch(deleteUserAddress(deleteUserAddressResult.data.data));
    setAlertSeverity('success');
    setAlertMessage(deleteUserAddressResult.data.message);
    setShowAlert(true);
  };

  return (
    <>
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
      <DeleteAddressPopup
        open={delAddress}
        setOpen={setDelAddress}
        onDelete={handleDelete}
      />
      <div className="delivery-address-page p-4 sm:p-5 xl:p-7">
        <h4 className="main-heading">Delivery Address</h4>
        <div className="grid grid-cols-12 gap-4">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="col-span-12 md:col-span-6">
              <div className="saved-addresses">
                <h5 className="heading">Saved Addresses</h5>
                <div
                  className="addresses-list"
                  style={{ maxHeight: '850px', overflow: 'auto' }}
                >
                  {addressList.map((item, index) => (
                    <div
                      className={`item ${
                        item && item.isActive ? 'active' : ''
                      }`}
                      key={index}
                      onClick={() => handleAddressClick(index)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          handleAddressClick(index);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      {item.isActive ? (
                        <CheckCircleOutlinedIcon className="icon checked" />
                      ) : (
                        <CircleOutlinedIcon className="icon unchecked" />
                      )}

                      <div className="address">
                        <p className="location">{item.type}</p>
                        <h6 className="detailed">{item.address}</h6>
                      </div>
                      <IconButton
                        className="btn-del"
                        onClick={(event) => {
                          event.stopPropagation();
                          setDeleteItem(item);
                          setDelAddress(true);
                        }}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="select-location col-span-12 md:col-span-6">
            {user === null && <NoLocationAvailable />}
            {user !== null && addressObj?.latitude === 0 && <NoLocationFound />}
            {user !== null && addressObj?.latitude !== 0 && (
              <MapHeader
                center={{ lat: location?.lat, lng: location?.lng }}
                handleMarkerDragEnd={handleMarkerDragEnd}
              />
            )}
            <div className="body h-100">
              <h5 className="title">Select Location</h5>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl className="location-address" variant="standard">
                    <InputLabel
                      className="font-open-sans text-sm font-normal text-neutral-500"
                      htmlFor={field.name}
                    >
                      Name
                    </InputLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      ref={field.ref}
                      value={field.value}
                      className="font-open-sans text-base font-semibold text-neutral-900 after:border-b-neutral-900"
                      type="text"
                    />
                  </FormControl>
                )}
              />
              <Controller
                name="location"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl className="location-address" variant="standard">
                    <InputLabel
                      className="font-open-sans text-sm font-normal text-neutral-500"
                      htmlFor={field.name}
                    >
                      Your Location
                    </InputLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      ref={field.ref}
                      value={field.value}
                      onChange={field.onChange}
                      className="font-open-sans text-base font-semibold text-neutral-900 after:border-b-neutral-900"
                      type="text"
                      onBlur={(event) => {
                        loadGoogleMaps().then((google) => {
                          const geocoder = new google.Geocoder();
                          if (event.target.value) {
                            geocoder.geocode(
                              { address: event.target.value },
                              (results: any, status: any) => {
                                if (status === google.GeocoderStatus.OK) {
                                  if (results && results[0]) {
                                    const newPosition =
                                      results[0].geometry.location.toJSON();
                                    handleMarkerDragEnd(newPosition);
                                  }
                                }
                              }
                            );
                          }
                        });
                      }}
                    />
                    <IconButton
                      className="btn-current-location"
                      onClick={handleCurrentLocation}
                    >
                      <MyLocationIcon />
                    </IconButton>
                  </FormControl>
                )}
              />
              <p className="location-label">Save As</p>
              <div className="all-locations grid grid-cols-3 gap-3">
                {typeData.map((el, index) => (
                  <div
                    className="item"
                    key={index}
                    onClick={() => setValue('type', el.type)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleAddressClick(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <input type="radio" name={el.name} />
                    <div className="content">
                      <div className="icon">{el.img}</div>
                      <p className="text">{el.type}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                color="inherit"
                className="btn-add-address"
                onClick={() =>
                  setTimeout(handleSubmit(addNewAddress, addNewAddressError), 0)
                }
              >
                Add Address
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryAddressPage;
