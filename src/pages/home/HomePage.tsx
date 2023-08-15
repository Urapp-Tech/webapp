import { useEffect, useState } from 'react'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import HomePagePopup from './HomePagePopup'
import assets from '../../assets'
import SelectLocationPopup from './SelectLocationPopup'
import LocationPopup from './LocationPopup'
import SnackBar from '../../components/common/SnackBar'
import { AlertColor } from '@mui/material'
import tenantService from '../../services/tenant'
import { tenantId } from '../../utilities/constant'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks'
import categoryService from '../../services/Category'
import { setId } from '../../redux/features/deviceState'
import { category } from '../../redux/features/categorySlice'
import { CategoryPayload } from '../../interfaces/Category'

const items = [
  {
    id: 1,
    name: 'Jacket',
    price: 12.0,
    image: assets.tempImages.jacket1,
  },
  {
    id: 2,
    name: 'Pants',
    price: 14.0,
    image: assets.tempImages.pants1,
  },
  {
    id: 3,
    name: 'Shirt',
    price: 16.0,
    image: assets.tempImages.shirt1,
  },
  {
    id: 4,
    name: 'Neck Scarf',
    price: 18.0,
    image: assets.tempImages.neckScarf1,
  },
  {
    id: 5,
    name: 'Printed T-shirt',
    price: 20.0,
    image: assets.tempImages.printedTShirt1,
  },
  {
    id: 6,
    name: 'Neck Scarf 2',
    price: 18.0,
    image: assets.tempImages.neckScarf1,
  },
  {
    id: 7,
    name: 'Printed T-shirt 2',
    price: 16.0,
    image: assets.tempImages.printedTShirt1,
  },
  {
    id: 8,
    name: 'Jacket 2',
    price: 14.0,
    image: assets.tempImages.jacket1,
  },
  {
    id: 9,
    name: 'Pants 2',
    price: 16.0,
    image: assets.tempImages.pants1,
  },
  {
    id: 10,
    name: 'Shirt 2',
    price: 18.0,
    image: assets.tempImages.shirt1,
  },
]

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
  const [DeviceId, setDeviceId] = useState(uuidv4())
  const [searchName, setSearchName] = useState('')
  const [filteredSubCategory, setFilteredSubCategory] = useState<any[]>([])
  const agent = navigator.userAgent
  const dispatch = useAppDispatch()

  const addItemHandler = (item: any) => {
    setSelectedItem(item)
    setDialogOpen(true)
  }

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
    tenantService.getTenantConfig().then((response) => {
      fetchIp().then((ip) => {
        // Combine agent, IP address, and DeviceId to form nameValue
        const nameValue = agent.slice(0, 11) + '-' + ip + '-' + DeviceId
        tenantService
          .deviceRegisteration({
            deviceId: DeviceId,
            deviceType: 'Android',
            isNotificationAllowed: true,
            name: nameValue,
            tenant: response.data.data.id,
            token: ' ',
          })
          .then((response) => {
            dispatch(setId(response.data.data.deviceId))
          })
          .catch((err) => console.log(err))
      })
    })
    categoryService
      .CategoryList()
      .then((response) => {
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
      {/* <LocationPopup
        open={selectLocationDialogOpen}
        setOpen={setSelectLocationDialogOpen}
      /> */}
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
                  <div className="cat-img">
                    <img src={category.icon} alt="" />
                  </div>
                </button>
              ))}
          </div>
        </div>
        <div className="selected-categories">
          <div className="mb-4 items-center justify-between sm:flex">
            <h4 className="heading">{selectedCategory?.name}</h4>
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
