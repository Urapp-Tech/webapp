import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import Input from '@mui/material/Input'
import { Link, useNavigate } from 'react-router-dom'
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
import {
  newOrder,
  removeFromCart,
  Cart,
} from '../../redux/features/cartStateSlice'
import { getItem } from '../../utilities/local-storage'
import cartService from '../../services/cart'
import AlertBox from '../../components/common/SnackBar'
import OrderService from '../../services/Order'
import { setUserAddressList } from '../../redux/features/deviceState'
import AddressService from '../../services/Address'
import { setToken } from '../../utilities/constant'

function MyBasketPage() {
  const { cartItems }: any = useAppSelector((state) => state.cartState)
  const dispatch = useAppDispatch()
  const [pickUpTime, setPickUpTime] = useState<dayjs.Dayjs | null>()
  const [dropOffTime, setDropOffTime] = useState<dayjs.Dayjs | null>()
  const Cartdata = getItem('RegisteredCart')
  const [promocode, setPromocode] = useState('')
  const navigate = useNavigate()
  const [alertMsg, setAlertMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const user = JSON.parse(localStorage.getItem('user')!)
  const userAddress = useAppSelector(
    (state: any) => state.deviceStates.AddressList,
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
      AddressService.getUserAddress().then((response) => {
        dispatch(setUserAddressList(response.data.data))
      })
    }
  }, [user, dispatch])

  const arr: any = []
  cartItems.forEach((el: any) => {
    const abc = {
      id: el.id,
      quantity: el.quantity,
    }
    arr.push(abc)
  })

  const onCheckout = () => {
    setToken(user?.token)
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
      navigate('/auth/login')
      return
    }
    if (pickUpTime && dropOffTime) {
      cartService
        .updateCart(reqBody)
        .then((response) => {
          dispatch(Cart(response.data.data.cart))
          OrderService.addOrder({ cartId: response.data.data.cart.id }).then(
            (OrderResponse) => {
              dispatch(newOrder(OrderResponse.data))
              window.location.replace(OrderResponse.data.data.paymentUrl)
            },
          )
        })
        .catch((error) => {
          setAlertMsg(error.message)
          setShowAlert(true)
          setAlertSeverity('error')
        })
    }
    setAlertMsg('Pickup Date & Drop off time is Required')
    setShowAlert(true)
    setAlertSeverity('error')
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

      <div className="cart-page p-4 sm:p-5 xl:p-7">
        <div className="mb-4 flex items-center justify-start md:mb-6">
          <h4 className="page-heading">My Basket</h4>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <div className="cart-products-card">
              <div className="overflow-x-auto">
                <table className="cart-products-table">
                  <thead className="border-b border-b-neutral-200 ">
                    <tr className="h-10">
                      <th>Products</th>
                      <th>Price</th>
                      <th>Items</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item: any) => (
                      <tr key={item.id}>
                        <td>
                          <div className="flex items-center gap-x-5">
                            <IconButton
                              className="btn-delete"
                              onClick={() => dispatch(removeFromCart(item?.id))}
                            >
                              <DeleteOutlineOutlinedIcon className="text-2xl" />
                            </IconButton>
                            <div className="product">
                              <img className="pic" src={item.image} alt="" />
                              <p className="name">{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td>${item?.price?.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="my-2.5 flex items-center justify-between px-5">
                <div className="flex items-center">
                  <p className="promo-label">Add Promo Code</p>
                  <FormControl variant="standard" size="small">
                    <Input
                      className="promo-field"
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
                </div>
                <Button
                  className="btn-add-more"
                  variant="outlined"
                  color="inherit"
                  startIcon={<ShoppingBagOutlinedIcon />}
                >
                  Add More to Basket
                </Button>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="cart-checkout-card">
              <div className="mb-5 grid grid-cols-1 sm:grid-cols-2">
                <div className="select-date-time sm:pr-4 lg:pr-7">
                  <DatePickerButton
                    onChange={handlePickUpTimeChange}
                    id="pick-up-date-time-picker"
                    icon={<DateRangeIcon />}
                    text="Pick up time"
                  />
                  <div className="mb-2 flex items-center">
                    <DateRangeIcon className="mr-2 text-xl" />
                    <p className="selected-value">
                      {pickUpTime?.format('ddd, MMM MM, YYYY')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <AccessTimeIcon className="mr-2 text-xl" />
                    <p className="selected-value">
                      {pickUpTime?.format('HH:mm')} -
                      {pickUpTime?.add(1, 'hours').format('HH:mm')}
                    </p>
                  </div>
                </div>
                <div className="select-date-time sm:pl-4 lg:pl-7">
                  <DatePickerButton
                    onChange={handleDropOffTimeChange}
                    id="drop-off-date-time-picker"
                    icon={<DateRangeIcon />}
                    text="Drop off time"
                  />
                  <div className="mb-2 flex items-center">
                    <DateRangeIcon className="mr-2 text-xl" />
                    <p className="selected-value">
                      {dropOffTime?.format('ddd, MMM MM, YYYY')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <AccessTimeIcon className="mr-2 text-xl" />
                    <p className="selected-value">
                      {dropOffTime?.format('HH:mm')} -
                      {dropOffTime?.add(1, 'hours').format('HH:mm')}
                    </p>
                  </div>
                </div>
              </div>
              {user ? (
                <div className="address-card">
                  <div className="key">
                    <LocationOnOutlinedIcon className="mr-2 text-xl" />
                    <p className="text">{userAddress[0]?.address}</p>
                  </div>
                  <Link className="value" to="/dashboard/delivery-address">
                    Change
                  </Link>
                </div>
              ) : (
                ''
              )}
              <div className="total-amount">
                <h5 className="heading">Total Amount</h5>
                <div className="mb-4 flex items-center justify-between">
                  <p className="key">Total Amount</p>
                  <p className="value">${total.toFixed(2)}</p>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="key">Discount</p>
                  <p className="value">$0.00</p>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="key">HST 13%</p>
                  <p className="value">${((total / 100) * 13).toFixed(2)}</p>
                </div>
              </div>
              <div className="grand-total">
                <p className="key">Grand Total</p>
                <p className="value">
                  ${(total + (total / 100) * 13).toFixed(2)}
                </p>
              </div>
              <Button
                type="button"
                onClick={() => onCheckout()}
                color="inherit"
                className="btn-checkout"
              >
                {user ? 'Checkout' : 'Proceed'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default MyBasketPage
