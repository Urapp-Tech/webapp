import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DiscountIcon from '@mui/icons-material/Discount';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../../components/common/SnackBar';
import { setDropOff, setPickup } from '../../redux/features/DateAndTime';
import {
  newOrder,
  removeFromCart,
  setCartData,
} from '../../redux/features/cartStateSlice';
import { setUserAddressList } from '../../redux/features/deviceState';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import AddressService from '../../services/Address';
import OrderService from '../../services/Order';
import cartService from '../../services/cart';
import { getItem, removeItem } from '../../utilities/local-storage';
import DatePickerButton from './DatePickerButton';

function MyBasketPage() {
  const { cartItems }: any = useAppSelector((state) => state.cartState);
  const { DropOff, PickUp } = useAppSelector((state) => state.dateState);
  const dispatch = useAppDispatch();
  const cartData = getItem('REGISTERED_CART');
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();
  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.authState.user);
  const userAddress = useAppSelector(
    (state: any) => state.deviceStates.AddressList
  );

  const handlePickUpTimeChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      dispatch(setPickup(value));
    }
  };
  const handleDropOffTimeChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      dispatch(setDropOff(value));
    }
  };
  const total = cartItems.reduce(
    (previousValue: any, currentValue: any) =>
      previousValue + currentValue.price * currentValue.quantity,
    0
  );
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      AddressService.getUserAddress().then((response) => {
        setIsLoading(false);
        dispatch(setUserAddressList(response.data.data));
      });
    }
  }, [dispatch, user]);

  const arr: any = [];
  cartItems.forEach((el: any) => {
    const abc = {
      id: el.id,
      quantity: el.quantity,
    };
    arr.push(abc);
  });

  const onCheckout = () => {
    const reqBody: any = {
      appUser: user?.id,
      appUserAddress: userAddress[0]?.id,
      appUserDevice: cartData?.appUserDevice,
      cartId: cartData?.id,
      dropDateTime: DropOff,
      pickupDateTime: PickUp,
      promoCode,
      tenant: cartData?.tenant,
      products: arr,
    };
    if (!user) {
      navigate('/auth/login');
    }
    if (PickUp && DropOff) {
      cartService
        .updateCart(reqBody)
        .then((response) => {
          dispatch(setCartData(response.data.data.cart));
          OrderService.addOrder({ cartId: response.data.data.cart.id }).then(
            (OrderResponse) => {
              dispatch(newOrder(OrderResponse.data));
              dispatch(setPickup(null));
              dispatch(setDropOff(null));
              removeItem('CART_ITEMS');
              window.location.replace(OrderResponse.data.data.paymentUrl);
            }
          );
        })
        .catch((error) => {
          setAlertMsg(error.message);
          setShowAlert(true);
          setAlertSeverity('error');
        });
    } else {
      setAlertMsg('Pickup Date & Drop off time is Required');
      setShowAlert(true);
      setAlertSeverity('error');
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverity={alertSeverity}
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
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
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
                  onClick={() => navigate('/dashboard/home')}
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
                    initialValue={PickUp}
                  />
                  <div className="mb-2 flex items-center">
                    <DateRangeIcon className="mr-2 text-xl" />
                    <p className="selected-value">
                      {PickUp
                        ? PickUp.format('ddd, MMM D, YYYY')
                        : 'Select a date'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <AccessTimeIcon className="mr-2 text-xl" />
                    <p className="selected-value">
                      {PickUp?.format('HH:mm')} -
                      {PickUp?.add(1, 'hours').format('HH:mm')}
                    </p>
                  </div>
                </div>
                <div className="select-date-time sm:pl-4 lg:pl-7">
                  <DatePickerButton
                    onChange={handleDropOffTimeChange}
                    id="drop-off-date-time-picker"
                    icon={<DateRangeIcon />}
                    text="Drop off time"
                    initialValue={DropOff}
                  />
                  <div className="mb-2 flex items-center">
                    <DateRangeIcon className="mr-2 text-xl" />
                    <p className="selected-value">
                      {DropOff
                        ? DropOff.format('ddd, MMM D, YYYY')
                        : 'Select a date'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <AccessTimeIcon className="mr-2 text-xl" />
                    <p className="selected-value">
                      {DropOff?.format('HH:mm')} -
                      {DropOff?.add(1, 'hours').format('HH:mm')}
                    </p>
                  </div>
                </div>
              </div>
              {user ? (
                <div className="address-card">
                  <div className="key" style={{ width: '500px' }}>
                    <LocationOnOutlinedIcon className="mr-2 text-xl" />
                    <p className="text">{userAddress[0]?.address}</p>
                  </div>
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
  );
}

export default MyBasketPage;
