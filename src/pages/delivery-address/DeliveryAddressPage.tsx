import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import DeleteAddressPopup from './DeleteAddressPopup'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks'
import {
  deleteUserAddress,
  setAddressStatus,
  setUserAddressList,
  setUserNewAddress,
} from '../../redux/features/deviceState'
import Map from '../../components/common/Map'
import { getItem } from '../../utilities/local-storage'
import AddressService from '../../services/Address'
import { setToken } from '../../utilities/constant'
import noLocation from '../../assets/images/icon-noMapLocation.svg'
import AlertBox from '../../components/common/SnackBar'
import Loader from '../../components/common/Loader'

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
    type: 'Others',
  },
]
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
  )
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
  )
}

function DeliveryAddressPage() {
  const addressList = useAppSelector(
    (state: any) => state.deviceStates.AddressList,
  )
  const user = getItem('user')
  const [delAddress, setDelAddress] = useState<boolean>(false)
  const [location, setLocation] = useState<any>({
    lat: addressList?.length > 0 ? addressList[0]?.latitude : 0,
    lng: addressList?.length > 0 ? addressList[0]?.longitude : 0,
  })
  const [activeAddress, setActiveAddress] = useState<any>()
  const [newAddress, setNewAddress] = useState('')
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [addressObj, setAddressObj] = useState<any>('')
  const geoCoder = new google.maps.Geocoder()
  const [alertMsg, setAlertMsg] = useState<any>('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [deleteItem, setDeleteItem] = useState<any>(null)
  const draggedAddress = useAppSelector(
    (state: any) => state.deviceStates.Address,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    setToken(user?.token)
    if (draggedAddress && draggedAddress.latitude && draggedAddress.longitude) {
      setLocation({
        lat: draggedAddress.latitude,
        lng: draggedAddress.longitude,
      })
    }
    setIsLoading(true)
    AddressService.getUserAddress()
      .then((response) => {
        const responseActiveAddress = response.data.data.find(
          (item: any) => item.isActive,
        )
        if (responseActiveAddress) {
          setActiveAddress(responseActiveAddress)
        }
        dispatch(setUserAddressList(response.data.data))
      })
      .catch((error) => {
        setAlertMsg(error.message)
        setShowAlert(true)
        setAlertSeverity('error')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleAddressClick = (index: number) => {
    const selectedAddress = addressList[index]
    setAddressObj(selectedAddress)
    setNewAddress(selectedAddress.address)
    setType(selectedAddress.type)
    setLocation({
      lat: selectedAddress.latitude,
      lng: selectedAddress.longitude,
    })
    AddressService.UpdateAddressStatus(
      selectedAddress.tenant,
      selectedAddress.id,
    )
      .then((response) => {
        setActiveAddress(response.data.data)
        dispatch(setAddressStatus(response.data.data))
      })
      .catch((error) => {
        setAlertMsg(error.message)
        setShowAlert(true)
        setAlertSeverity('error')
      })
  }

  const handleMarkerDragEnd = (newPosition: google.maps.LatLngLiteral) => {
    setLocation(newPosition)
    geoCoder.geocode(
      { location: newPosition },
      (
        result: google.maps.GeocoderResult[] | null,
        status: google.maps.GeocoderStatus,
      ) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (result && result[0]) {
            setNewAddress(result[0].formatted_address)
            setType('')
            setActiveAddress(false)
          }
        }
      },
    )
  }
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          const latLng = new google.maps.LatLng(latitude, longitude)
          geoCoder.geocode(
            { location: latLng },
            (
              results: google.maps.GeocoderResult[] | null,
              status: google.maps.GeocoderStatus,
            ) => {
              if (
                status === google.maps.GeocoderStatus.OK &&
                results &&
                results[0]
              ) {
                const formattedAddress = results[0].formatted_address
                setLocation({
                  lat: latitude,
                  lng: longitude,
                })
                setNewAddress(formattedAddress) // Update the input field with the current location's address
              } else {
                setAlertMsg(status)
                setShowAlert(true)
                setAlertSeverity('error')
              }
            },
          )
        },
        (error) => {
          setAlertMsg(error)
          setShowAlert(true)
          setAlertSeverity('error')
        },
      )
    } else {
      setAlertMsg('Geolocation is not supported by this browser.')
      setShowAlert(true)
      setAlertSeverity('error')
    }
  }
  const addNewAddress = () => {
    AddressService.userAddress({
      address: newAddress,
      latitude: location.lat,
      longitude: location.lng,
      name,
      type,
    })
      .then((response) => {
        console.log(response)
        dispatch(setUserNewAddress(response.data.data))
        setAlertMsg(response.data.message)
        setShowAlert(true)
        setAlertSeverity('success')
      })
      .catch((error) => {
        console.log(error)
        setAlertMsg(error.response.data.message)
        setShowAlert(true)
        setAlertSeverity('error')
      })
  }
  function MapHeader() {
    return (
      <div className="header" style={{ height: '600px' }}>
        <Map
          center={{ lat: location?.lat, lng: location?.lng }}
          zoom={15}
          handleDragged={handleMarkerDragEnd}
        />
      </div>
    )
  }
  console.log(deleteItem)
  const handleDelete = () => {
    setToken(user?.token)
    AddressService.deleteUserAddress(deleteItem?.tenant, deleteItem?.id)
      .then((response) => {
        dispatch(deleteUserAddress(response.data.data))
        setAlertMsg(response.data.message)
        setShowAlert(true)
        setAlertSeverity('success')
      })
      .catch((error) => {
        console.log(error)
        setAlertMsg(error.message)
        setShowAlert(true)
        setAlertSeverity('error')
      })
  }

  const sortedAddressList = addressList.slice()
  const activeIndex = sortedAddressList.findIndex(
    (item: any) => item.id === activeAddress?.id,
  )

  if (activeIndex !== -1) {
    const activeAddressItem = sortedAddressList.splice(activeIndex, 1)[0]
    sortedAddressList.unshift(activeAddressItem)
  }
  return (
    <>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverty={alertSeverity}
          alertOpen={showAlert}
          setAlertOpen={setShowAlert}
        />
      )}
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
                  {sortedAddressList?.map((item: any, index: any) => (
                    <div
                      className={`item ${item.isActive ? 'active' : ''}`}
                      key={index}
                      onClick={() => handleAddressClick(index)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          handleAddressClick(index)
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
                        onClick={() => {
                          setDeleteItem(item)
                          setDelAddress(true)
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
            {user !== null && addressObj?.latitude !== 0 && <MapHeader />}
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
                  onChange={(e) => {
                    setNewAddress(e.target.value)
                    setType('') // Clear the selected type when user manually enters address
                    // Call geocoder to update the marker position
                    if (geoCoder && e.target.value) {
                      geoCoder.geocode(
                        { address: e.target.value },
                        (results: any, status: any) => {
                          if (status === google.maps.GeocoderStatus.OK) {
                            if (results && results[0]) {
                              const newPosition = results[0].geometry.location.toJSON()
                              handleMarkerDragEnd(newPosition)
                              setActiveAddress(null) // Clear active address when user enters new location
                            }
                          }
                        },
                      )
                    }
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
                        handleAddressClick(index)
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
  )
}

export default DeliveryAddressPage
