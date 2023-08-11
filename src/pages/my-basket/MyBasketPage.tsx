import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import DiscountIcon from '@mui/icons-material/Discount'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import DateRangeIcon from '@mui/icons-material/DateRange'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks'
import DatePickerButton from './DatePickerButton'
import MyBasketPagePopup from './MyBasketPagePopup'
import { newOrder, removeFromCart } from '../../redux/features/cartStateSlice'
import MarkersMap from '../../components/common/MarkerMap'
import { Marker } from '../../interfaces/map.interface'
import { getItem } from '../../utilities/local-storage'
import cartService from '../../services/cart'
import { Cart } from '../../redux/features/cartStateSlice'
import { useNavigate } from 'react-router-dom'
import AlertBox from '../../components/common/SnackBar'
import OrderService from '../../services/Order'
import { setUserAddressList } from '../../redux/features/deviceState'
import AddressService from '../../services/Address'
import { setToken } from '../../utilities/constant'

function MyBasketPage() {
  const { cartItems } = useAppSelector((state) => state.cartState)
  const dispatch = useAppDispatch()
  const [pickUpTime, setPickUpTime] = useState<dayjs.Dayjs | null>()
  const [dropOffTime, setDropOffTime] = useState<dayjs.Dayjs | null>()
  const Cartdata = getItem('RegisteredCart')
  const [promocode, setPromocode] = useState('')
  const auth = useAppSelector((state) => state.deviceStates)
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const authUser = useAppSelector((state) => state.authState)
  const [addressPopup, setAddressPopup] = useState(false)
  const user = JSON.parse(localStorage.getItem('user')!)
  const token = localStorage.getItem('token')
  const userAddress: any = useAppSelector(
    (state) => state.deviceStates.AddressList,
  )

  const handlePickUpTimeChange = (value: dayjs.Dayjs | null) => {
    setPickUpTime(value)
  }
  const handleDropOffTimeChange = (value: dayjs.Dayjs | null) => {
    setDropOffTime(value)
  }
  const total = cartItems.reduce(
    (previousValue: any, currentValue: any) =>
      previousValue + currentValue.price * currentValue.quantity,
    0,
  )
  useEffect(() => {
    if (user) {
      AddressService.getUserAddress()
        .then((response) => {
          console.log(response.data.data)
          dispatch(setUserAddressList(response.data.data))
        })
        .catch((error) => console.log(error))
    }
  }, [])

  let arr: any = []
  cartItems.forEach((el: any) => {
    let abc = {
      id: el.id,
      quantity: el.quantity,
    }
    arr.push(abc)
  })

  setToken(user?.token)

  const onCheckout = () => {
    const reqBody: any = {
      appUser: user?.id,
      appUserAddress: userAddress[0]?.id,
      appUserDevice: Cartdata?.appUserDevice,
      cartId: Cartdata?.id,
      dropDateTime: dropOffTime,
      pickupDateTime: pickUpTime,
      promoCode: promocode,
      tenant: Cartdata?.tenant,
      products: arr,
    }
    if (!user) {
      return navigate('/auth/login')
    } else {
      if (pickUpTime && dropOffTime) {
        cartService
          .updateCart(reqBody)
          .then((response) => {
            dispatch(Cart(response.data.data.cart))
            OrderService.addOrder({ cartId: response.data.data.cart.id })
              .then((response) => dispatch(newOrder(response.data)))
              .catch((error) => console.log(error))
          })
          .catch((error) => {
            console.log(error)
            setAlertMsg(error.message)
            setShowAlert(true)
            setAlertSeverity('error')
          })
      } else {
        setAlertMsg('Pickup Date & Drop off time is Required')
        setShowAlert(true)
        setAlertSeverity('error')
      }
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverty={alertSeverity}
          alertOpen={showAlert}
          setAlertOpen={setShowAlert}
        />
      )}

      <div className="container px-5 py-5">
        <div className="font-open-sans text-3xl font-semibold text-neutral-900">
          My Basket
        </div>
        <div className="my-4 grid grid-cols-5 gap-4 ">
          <div className="col-span-3 mb-auto w-full rounded-xl bg-gray-50 p-4 shadow-md">
            <table className="w-full table-auto">
              <thead className="border-b border-b-neutral-200 ">
                <tr className="h-10">
                  <th className="text-start font-open-sans text-sm font-semibold text-neutral-900">
                    Products
                  </th>
                  <th className="text-end font-open-sans text-sm font-semibold text-neutral-900">
                    Price
                  </th>
                  <th className="text-end font-open-sans text-sm font-semibold text-neutral-900">
                    Quantity
                  </th>
                  <th className="text-end font-open-sans text-sm font-semibold text-neutral-900">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="h-16 border-b border-b-neutral-200"
                  >
                    <td className="text-start">
                      <div className="flex items-center">
                        <IconButton
                          className="p-0 text-neutral-900"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <DeleteOutlineOutlinedIcon className="text-3xl" />
                        </IconButton>
                        <img
                          className="mx-4 aspect-square w-11 rounded-full object-cover outline outline-2 outline-neutral-900"
                          src={item.image}
                          alt=""
                        />
                        <div className="font-open-sans text-sm font-normal text-neutral-900">
                          {item.name}
                        </div>
                      </div>
                    </td>
                    <td className="text-end font-open-sans text-xs font-normal text-neutral-900">
                      ${item?.price?.toFixed(2)}
                    </td>
                    <td className="text-end font-open-sans text-xs font-normal text-neutral-900">
                      {item.quantity}
                    </td>
                    <td className="text-end font-open-sans text-sm font-semibold text-neutral-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex w-full items-center p-4">
              <div className="mr-2 font-open-sans text-xs font-semibold text-neutral-900">
                Add Promo Code
              </div>
              <FormControl variant="standard" size="small">
                <Input
                  className="rounded-xl border border-neutral-200 p-2 font-open-sans text-xs font-normal text-neutral-900"
                  id="input-with-icon-adornment"
                  disableUnderline
                  inputProps={{
                    placeholder: 'Enter Promo Code',
                  }}
                  value={promocode}
                  onChange={(e) => setPromocode(e.target.value)}
                  startAdornment={
                    <InputAdornment
                      className="text-orange-100"
                      position="start"
                    >
                      <DiscountIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <div className="flex-grow"> </div>
              <Button
                className="border-none font-open-sans text-xs font-semibold text-neutral-900"
                variant="outlined"
                color="inherit"
                startIcon={<ShoppingBagOutlinedIcon />}
              >
                Add More to Basket
              </Button>
            </div>
          </div>
          <div className="col-span-2 w-full rounded-xl bg-gray-50 p-4 shadow-md">
            <div className="mb-4 flex justify-between">
              <div>
                <DatePickerButton
                  onChange={handlePickUpTimeChange}
                  id="pick-up-date-time-picker"
                  icon={<DateRangeIcon />}
                  text="Pick up time"
                />
                <div className="mt-2 flex items-center">
                  <DateRangeIcon className="mr-2 text-xl text-neutral-900" />
                  <div className="font-open-sans text-xs font-normal text-neutral-500">
                    {pickUpTime?.format('ddd, MMM MM, YYYY')}
                  </div>
                </div>
                <div className="flex items-center">
                  <AccessTimeIcon className="mr-2 text-xl text-neutral-900" />
                  <div className="font-open-sans text-xs font-normal text-neutral-500">
                    {pickUpTime?.format('HH:mm')} -
                    {pickUpTime?.add(1, 'hours').format('HH:mm')}
                  </div>
                </div>
              </div>
              <div className="w-[2px] rounded-lg bg-neutral-200"> </div>
              <div>
                <DatePickerButton
                  onChange={handleDropOffTimeChange}
                  id="drop-off-date-time-picker"
                  icon={<DateRangeIcon />}
                  text="Drop off time"
                />
                <div className="mt-2 flex items-center">
                  <DateRangeIcon className="mr-2 text-xl text-neutral-900" />
                  <div className="font-open-sans text-xs font-normal text-neutral-500">
                    {dropOffTime?.format('ddd, MMM MM, YYYY')}
                  </div>
                </div>
                <div className="flex items-center">
                  <AccessTimeIcon className="mr-2 text-xl text-neutral-900" />
                  <div className="font-open-sans text-xs font-normal text-neutral-500">
                    {dropOffTime?.format('HH:mm')} -
                    {dropOffTime?.add(1, 'hours').format('HH:mm')}
                  </div>
                </div>
              </div>
            </div>
            <hr className="h-[1px] rounded-lg bg-neutral-200" />
            {user ? (
              <div className="flex items-center py-2">
                <LocationOnOutlinedIcon className="mr-2 text-xl text-neutral-900" />
                <div className="font-open-sans text-xs font-normal text-neutral-500">
                  {userAddress[0]?.address}
                </div>
                <div className="flex-grow"> </div>
                <div className="font-open-sans text-sm font-normal text-neutral-900">
                  <Button>Change</Button>
                </div>
              </div>
            ) : (
              ''
            )}
            {/* <div className="flex items-center py-2">
              <CreditCardOutlinedIcon className="mr-2 text-xl text-neutral-900" />
              <div className="font-open-sans text-xs font-normal text-neutral-500">
                **** **** **** 6584
              </div>
              <div className="flex-grow"> </div>
              <div className="font-open-sans text-sm font-normal text-neutral-900">
                Change
              </div>
            </div>
            <hr className="h-[1px] rounded-lg bg-neutral-200" /> */}
            <hr className="h-[1px] rounded-lg bg-neutral-200" />
            <div className="my-4">
              <div className="font-open-sans text-lg font-semibold text-neutral-900">
                Total Amount
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="font-open-sans text-xs font-normal text-neutral-900">
                  Total Amount
                </div>
                <div className="font-open-sans text-sm font-bold text-neutral-900">
                  ${total.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="font-open-sans text-xs font-normal text-neutral-900">
                  Discount
                </div>
                <div className="font-open-sans text-sm font-bold text-neutral-900">
                  $0.00
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="font-open-sans text-xs font-normal text-neutral-900">
                  HST 13%
                </div>
                <div className="font-open-sans text-sm font-bold text-neutral-900">
                  ${((total / 100) * 13).toFixed(2)}
                </div>
              </div>
            </div>
            <hr className="h-[1px] rounded-lg bg-neutral-200" />
            <div className="mb-2 flex items-center justify-between py-2">
              <div className="font-open-sans text-lg font-semibold text-neutral-900">
                Grand Total
              </div>
              <div className="font-open-sans text-sm font-bold text-neutral-900">
                ${(total + (total / 100) * 13).toFixed(2)}
              </div>
            </div>
            <Button
              type="button"
              onClick={() => onCheckout()}
              color="inherit"
              className="w-full rounded-lg bg-neutral-900 font-open-sans text-base font-semibold text-gray-50"
            >
              {user ? 'Checkout' : 'Proceed'}
            </Button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default MyBasketPage
