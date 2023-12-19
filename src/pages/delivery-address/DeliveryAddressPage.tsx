import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { AlertColor } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useCallback, useEffect, useState } from 'react';
import noLocation from '../../assets/images/icon-noMapLocation.svg';
import Loader from '../../components/common/Loader';
import Map from '../../components/common/Map';
import AlertBox from '../../components/common/SnackBar';
import {
  deleteUserAddress,
  setAddressStatus,
  setUserAddressList,
  setUserNewAddress,
} from '../../redux/features/deviceState';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import addressService from '../../services/address.service';
import { UpdateAddressStatusData } from '../../types/address.types';
import loadGoogleMaps from '../../utilities/load-google-maps';
import promiseHandler from '../../utilities/promise-handler';
import DeleteAddressPopup from './DeleteAddressPopup';

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
];

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
  const addressList = useAppSelector((state) => state.deviceStates.addressList);
  const user = useAppSelector((state) => state.authState.user);
  const [delAddress, setDelAddress] = useState<boolean>(false);
  const [location, setLocation] = useState<any>({
    lat: addressList?.length > 0 ? addressList[0]?.latitude : 0,
    lng: addressList?.length > 0 ? addressList[0]?.longitude : 0,
  });
  const [activeAddress, setActiveAddress] =
    useState<UpdateAddressStatusData | null>(null);
  const [newAddress, setNewAddress] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [addressObj, setAddressObj] = useState<any>('');
  const [alertMsg, setAlertMsg] = useState<any>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
  const [isLoading, setIsLoading] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const draggedAddress = useAppSelector(
    (state: any) => state.deviceStates.Address
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getUserAddress() {
      if (
        draggedAddress &&
        draggedAddress.latitude &&
        draggedAddress.longitude
      ) {
        setLocation({
          lat: draggedAddress.latitude,
          lng: draggedAddress.longitude,
        });
      }
      setIsLoading(true);
      const getUserAddressPromise = addressService.getUserAddress();
      const [getUserAddressResult, getUserAddressError] = await promiseHandler(
        getUserAddressPromise
      );
      setIsLoading(false);
      if (!getUserAddressResult) {
        setAlertSeverity('error');
        setAlertMsg(getUserAddressError.message);
        setShowAlert(true);
        return;
      }
      if (!getUserAddressResult.data.success) {
        setAlertSeverity('error');
        setAlertMsg(getUserAddressResult.data.message);
        setShowAlert(true);
        return;
      }

      dispatch(setUserAddressList(getUserAddressResult.data.data));
      const tempActiveAddress = getUserAddressResult.data.data.find(
        (item: any) => item.isActive
      );
      if (tempActiveAddress) {
        setActiveAddress(tempActiveAddress);
      }
    }
    getUserAddress();
  }, []);

  const handleAddressClick = async (index: number) => {
    const selectedAddress = addressList[index];
    setAddressObj(selectedAddress);
    setNewAddress(selectedAddress.address);
    setType(selectedAddress.type);
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
      setAlertMsg(updateAddressStatusError.message);
      setShowAlert(true);
      return;
    }
    if (!updateAddressStatusResult.data.success) {
      setAlertSeverity('error');
      setAlertMsg(updateAddressStatusResult.data.message);
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
                setNewAddress(result[0].formatted_address);
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
                  setNewAddress(formattedAddress); // Update the input field with the current location's address
                } else {
                  setAlertSeverity('error');
                  setAlertMsg(status);
                  setShowAlert(true);
                }
              }
            );
          });
        },
        (error) => {
          setAlertSeverity('error');
          setAlertMsg(error);
          setShowAlert(true);
        }
      );
    } else {
      setAlertSeverity('error');
      setAlertMsg('Geolocation is not supported by this browser.');
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
      onAddressChange(newAddress);
    }, 1500);

    return () => clearTimeout(timer);
  }, [newAddress]);

  const addNewAddress = async () => {
    if (!name) {
      setAlertSeverity('error');
      setAlertMsg('Name Field Is Required');
      setShowAlert(true);
      return;
    }
    if (!newAddress) {
      setAlertSeverity('error');
      setAlertMsg('Address Field Is Required');
      setShowAlert(true);
      return;
    }
    if (!type) {
      setAlertSeverity('error');
      setAlertMsg('Type Must Be Selected');
      setShowAlert(true);
      return;
    }
    const addUserAddressPromise = addressService.addUserAddress({
      address: newAddress,
      latitude: location.lat,
      longitude: location.lng,
      name,
      type,
    });
    const [addUserAddressResult, addUserAddressError] = await promiseHandler(
      addUserAddressPromise
    );
    if (!addUserAddressResult) {
      setAlertSeverity('error');
      setAlertMsg(addUserAddressError.message);
      setShowAlert(true);
      return;
    }
    if (!addUserAddressResult.data.success) {
      setAlertSeverity('error');
      setAlertMsg(addUserAddressResult.data.message);
      setShowAlert(true);
      return;
    }
    dispatch(setUserNewAddress(addUserAddressResult.data.data));
  };

  const handleDelete = async () => {
    const tempDeleteItemId: string | null = deleteItem ? deleteItem.id : null;
    if (!tempDeleteItemId) {
      setAlertSeverity('error');
      setAlertMsg('Delete Id Not Set');
      setShowAlert(true);
      return;
    }
    const deleteUserAddressPromise =
      addressService.deleteUserAddress(tempDeleteItemId);

    const [deleteUserAddressResult, deleteUserAddressError] =
      await promiseHandler(deleteUserAddressPromise);
    if (!deleteUserAddressResult) {
      setAlertSeverity('error');
      setAlertMsg(deleteUserAddressError.message);
      setShowAlert(true);
      return;
    }
    if (!deleteUserAddressResult.data.success) {
      setAlertSeverity('error');
      setAlertMsg(deleteUserAddressResult.data.message);
      setShowAlert(true);
      return;
    }
    dispatch(deleteUserAddress(deleteUserAddressResult.data.data));
    setAlertSeverity('success');
    setAlertMsg(deleteUserAddressResult.data.message);
    setShowAlert(true);
  };

  return (
    <>
      <AlertBox
        msg={alertMsg}
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
        <div className="grid grid-cols-2 gap-4">
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <div className="saved-addresses">
                <h5 className="heading">Saved Addresses</h5>
                <div
                  className="addresses-list"
                  style={{ maxHeight: '850px', overflow: 'auto' }}
                >
                  {addressList.map((item: any, index: any) => (
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
                      role="button" // Add a role attribute
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

          <div className="select-location">
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
              <FormControl className="location-address" variant="standard">
                <InputLabel
                  className="font-open-sans text-sm font-normal text-neutral-500"
                  htmlFor="location"
                >
                  Your Name
                </InputLabel>
                <Input
                  className="font-open-sans text-base font-semibold text-neutral-900 after:border-b-neutral-900"
                  id="location"
                  type="location"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl className="location-address" variant="standard">
                <InputLabel
                  className="font-open-sans text-sm font-normal text-neutral-500"
                  htmlFor="location"
                >
                  Your Location
                </InputLabel>
                <Input
                  className="font-open-sans text-base font-semibold text-neutral-900 after:border-b-neutral-900"
                  id="location"
                  type="location"
                  value={newAddress}
                  onChange={(event) => setNewAddress(event.target.value)}
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

              <p className="location-label">Save As</p>
              <div className="all-locations grid grid-cols-3 gap-3">
                {typeData.map((el: any, index) => (
                  <div
                    className="item"
                    key={index}
                    onClick={() => setType(el.type)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleAddressClick(index);
                      }
                    }}
                    role="button" // Add a role attribute
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
                onClick={addNewAddress}
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
