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
import { setUserAddressList } from '../../redux/features/deviceState'
import Map from '../../components/common/Map'
import { getItem } from '../../utilities/local-storage'
import AddressService from '../../services/Address'
import { setToken } from '../../utilities/constant'

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

function DeliveryAddressPage() {
  const addressList: any[] = useAppSelector(
    (state) => state.deviceStates.AddressList,
  )
  const user = getItem('user')
  const [delAddress, setDelAddress] = useState<boolean>(false)
  const [location, setLocation] = useState<any>()
  const [activeAddress, setActiveAddress] = useState<any>(null)
  const [newAddress, setNewAddress] = useState('')
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [addressObj, setAddressObj] = useState<any>('')
  const geoCoder = new google.maps.Geocoder()
  const draggedAddress: any = useAppSelector(
    (state) => state.deviceStates.Address,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    setToken(user.token)
    if (draggedAddress && draggedAddress.latitude && draggedAddress.longitude) {
      setLocation({
        lat: draggedAddress.latitude,
        lng: draggedAddress.longitude,
      })
    }
    AddressService.getUserAddress()
      .then((response) => dispatch(setUserAddressList(response.data.data)))
      .catch((error) => console.log(error))
  }, [draggedAddress])

  const handleAddressClick = (index: number) => {
    setActiveAddress(index) // Set the active address index
    const selectedAddress = addressList[index]
    setAddressObj(selectedAddress)
    setNewAddress(selectedAddress.address) // Update the input field with the clicked address
    setType(selectedAddress.type) // Update the selected type
    setLocation({
      lat: selectedAddress.latitude,
      lng: selectedAddress.longitude,
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
          }
        } else {
          console.error(
            'Geocode was not successful for the following reason:',
            status,
          )
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
                console.error(
                  'Geocode was not successful for the following reason:',
                  status,
                )
              }
            },
          )
        },
        (error) => {
          console.error('Error getting current location:', error)
        },
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }
  const addNewAddress = () => {
    AddressService.userAddress({
      address: newAddress,
      latitude: location.lat,
      longitude: location.lng,
      name: name,
      type: type,
    })
      .then((response) => {
        console.log(response)
        // dispatch()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <DeleteAddressPopup open={delAddress} setOpen={setDelAddress} />
      <div className="p-4 sm:p-5 xl:p-7 delivery-address-page">
        <h4 className="main-heading">Delivery Address</h4>
        <div className="grid grid-cols-2 gap-4">
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
                      index === activeAddress ? 'active' : ''
                    }`}
                    key={index}
                    onClick={() => handleAddressClick(index)}
                  >
                    {index === activeAddress ? (
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
                      onClick={() => setDelAddress(true)}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="select-location">
            {addressObj?.latitude === 0 ? (
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
            ) : (
              <div className="header" style={{ height: '600px' }}>
                <Map
                  center={{ lat: location?.lat, lng: location?.lng }}
                  zoom={15}
                  handleDragged={handleMarkerDragEnd}
                />
              </div>
            )}

            <div className="body">
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
              <div className="grid grid-cols-3 gap-3 all-locations">
                {typeData.map((el: any, index) => (
                  <div
                    className="item"
                    key={index}
                    onClick={() => setType(el.type)}
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
