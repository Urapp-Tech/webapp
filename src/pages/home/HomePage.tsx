import { useEffect, useState } from 'react'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import HomePagePopup from './HomePagePopup'
import LocationPopup from './LocationPopup'
import tenantService from '../../services/tenant'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks'
import categoryService from '../../services/Category'
import { setDeviceData } from '../../redux/features/deviceState'
import { ClientJS } from 'clientjs'
import cartService from '../../services/cart'
import { getCart } from '../../redux/features/cartStateSlice'
import { getItem } from '../../utilities/local-storage'
import Address from '../../services/Address'

function getCategoryClasses(isActive: boolean) {
  const classes = 'item'

  if (isActive) {
    return `${classes} active shadow-lg`
  }
  return classes
}

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [subCategory, setSubCategory] = useState<any>([])
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [selectLocationDialogOpen, setSelectLocationDialogOpen] = useState<
    boolean
  >(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchName, setSearchName] = useState('')
  const [filteredSubCategory, setFilteredSubCategory] = useState<any[]>([])
  const RegisteredDevice = useAppSelector(
    (state) => state.deviceStates.DeviceData?.deviceId,
  )
  const dispatch = useAppDispatch()
  const [location, setLocation] = useState<any>()
  const userAddress = useAppSelector((state) => state.deviceStates.Address)
   const addItemHandler = (item: any) => {
    setSelectedItem(item)
    setDialogOpen(true)
  }
  const client = new ClientJS()
  const fingerprint = client.getFingerprint()
  const agent = client.getUserAgent()
  const fetchIp = async () => {
    const url = 'https://api.ipify.org/?format=json'
    try {
      const response = await fetch(url)
      let address = await response.json()
      return address.ip
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const persistedDeviceData: any = getItem('deviceData')
    if (persistedDeviceData) {
      dispatch(setDeviceData(JSON.parse(persistedDeviceData)))
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      return setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })

    fetchIp().then((ip) => {
      const nameValue = agent.slice(0, 11) + '-' + ip + '-' + fingerprint
      if (persistedDeviceData === null) {
        // Address.userAddress({
        //   address: userAddress,
        //   latitude: location?.lat,
        //   longitude: location?.lng,
        //   name: nameValue,
        //   type: 'home',
        // })
        //   .then((response) => console.log(response))
        //   .catch((error) => console.log(error))
        tenantService.getTenantConfig().then((response) => {
          tenantService
            .deviceRegisteration({
              deviceId: fingerprint.toString(),
              deviceType: 'Android',
              isNotificationAllowed: true,
              name: nameValue,
              tenant: response.data.data.id,
              token: 'undefined',
            })
            .then((response) => {
              dispatch(setDeviceData(response.data.data))
              cartService
                .AnonyomousCart({
                  tenant: response.data.data?.tenant,
                  appUserDevice: response.data.data?.id,
                })
                .then((response) => {
                  dispatch(getCart(response.data.data.cart))
                })
            })
            .catch((err) => console.log(err))
        })
      }
    })
    categoryService
      .CategoryList()
      .then((response) => {
        onClickButton(response.data.data[0])
        setSelectedCategory(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const onClickButton = (item: any) => {
    categoryService
      .SubCategory(item.id)
      .then((response) => setSubCategory(response.data.data))
      .catch((error) => {
        console.log(error)
      })
  }
  const searchSubCategory = () => {
    if (!searchName) {
      setFilteredSubCategory(subCategory.homeCatItems)
    } else {
      const filteredItems = subCategory.homeCatItems.filter((item: any) => {
        const priceString = item?.price?.toString() || ''
        return (
          item.name.toLowerCase().includes(searchName.toLowerCase()) ||
          priceString.includes(searchName)
        )
      })
      setFilteredSubCategory(filteredItems)
    }
  }
  useEffect(() => {
    if (subCategory?.homeCatItems?.length > 0) {
      searchSubCategory()
    }
  }, [searchName, subCategory])

  return (
    <>
      <HomePagePopup
        open={dialogOpen}
        setOpen={setDialogOpen}
        data={selectedItem}
      />
      <LocationPopup
        open={selectLocationDialogOpen}
        setOpen={setSelectLocationDialogOpen}
      />
      <div className="px-4 pt-6 sm:px-5 sm:pt-4 xl:px-7">
        <div className="all-categories">
          <h4 className="heading">Categories</h4>
          <div className="categories-list">
            {selectedCategory &&
              selectedCategory.map((category: any) => (
                <button
                  type="button"
                  onClick={() => {
                    onClickButton(category)
                  }}
                  key={category.id}
                  className={getCategoryClasses(
                    category.id === selectedCategory?.id,
                  )}
                >
                  <h3 className="cat-name">{category.name}</h3>
                  <div className="grow">
                    <img
                      src={category.icon}
                      alt=""
                      className="cat-img"
                      width={100}
                      height={100}
                    />
                  </div>
                </button>
              ))}
          </div>
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
    </>
  )
}

export default HomePage
