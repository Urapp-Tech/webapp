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
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../../components/common/SnackBar';
import { setDropOff, setPickup } from '../../redux/features/DateAndTime';
import {
  removeFromCart,
  resetCart,
  setCartData,
} from '../../redux/features/cartStateSlice';
import { setUserAddressList } from '../../redux/features/deviceState';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import AddressService from '../../services/Address';
import OrderService from '../../services/Order';
import cartService from '../../services/cart';
import DatePickerButton from './DatePickerButton';
import PayFastForm from './PayFastForm';

function MyBasketPage() {
  const { cartItems, cartData }: any = useAppSelector(
    (state) => state.cartState
  );
  const { DropOff, PickUp } = useAppSelector((state) => state.dateState);
  const user = useAppSelector((state) => state.authState.user);
  const userAddress = useAppSelector((state) => state.deviceStates.AddressList);
  const dispatch = useAppDispatch();

  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();
  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [payFastFormData, setPayFastFormData] = useState<any>(null);

  const formSubmitButtonRef = useRef<HTMLButtonElement>(null);

  const handlePickUpTimeChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      dispatch(setPickup(value.toISOString()));
    }
  };
  const handleDropOffTimeChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      dispatch(setDropOff(value.toISOString()));
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      AddressService.getUserAddress().then((response) => {
        setIsLoading(false);
        dispatch(setUserAddressList(response.data.data));
      });
    }
  }, [dispatch, user]);

  useEffect(() => {}, [cartData]);

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
      products: cartItems.map((item) => {
        return { id: item.id, quantity: item.buyCount };
      }),
    };
    if (!user) {
      navigate('/auth/login');
    }
    if (PickUp && DropOff) {
      cartService
        .updateCart(reqBody)
        .then((response) => {
          if (response.data.success) {
            dispatch(setCartData(response.data.data.cart));
            return OrderService.addPayFastOrder({
              cartId: response.data.data.cart.id,
            });
          }
          return { data: { success: false } };
        })
        .then(async (orderResponse) => {
          if (orderResponse.data.success) {
            dispatch(setPickup(null));
            dispatch(setDropOff(null));
            dispatch(resetCart());
            // window.location.replace(orderResponse.data.data.paymentUrl);
            const payFastTokenData = await OrderService.getPayFastToken();
            if (payFastTokenData.data.success) {
              setPayFastFormData({
                merchantId: payFastTokenData.data.data.merchantId,
                token: payFastTokenData.data.data.accessToken,
                merchantName: payFastTokenData.data.data.name,
                generatedDateTime: payFastTokenData.data.data.generatedDateTime,
                successURL: payFastTokenData.data.data.successUrl,
                failureURL: payFastTokenData.data.data.cancelUrl,
                // webHookURL: payFastTokenData.data.data.payFastHookUrl,
                webHookURL:
                  'https://c8a4-2400-adc1-47f-8600-ad55-77e7-42ea-b489.ngrok-free.app/api/v1/app/appOrder/pay-fast/webhook',
                userName: user?.firstName,
                totalPrice: orderResponse.data.data.order.grandTotal,
                phoneNumber: user?.phone,
                emailAddress: user?.email,
                items: orderResponse.data.data.orderItems.map((item: any) => ({
                  id: item.itemId,
                  quantity: item.quantity,
                  price: item.unitPrice.replace('$', ''),
                })),
                orderId: orderResponse.data.data.order.id,
                currencyType: 'USD',
              });
              setTimeout(() => {
                formSubmitButtonRef?.current?.click();
              }, 250);
            }
          }
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
                        <td>${Number(item?.price ?? 0).toFixed(2)}</td>
                        <td>{Number(item?.buyCount ?? 0).toFixed(2)}</td>
                        <td>
                          $
                          {(
                            Number(item?.price ?? 0) *
                            Number(item?.buyCount ?? 0)
                          ).toFixed(2)}
                        </td>
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
                    initialValue={dayjs(PickUp ?? new Date())}
                  />
                  <div className="mb-2 flex items-center">
                    <DateRangeIcon className="mr-2 text-xl" />
                    <p className="selected-value">
                      {PickUp
                        ? dayjs(PickUp ?? new Date()).format('ddd, MMM D, YYYY')
                        : 'Select a date'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <AccessTimeIcon className="mr-2 text-xl" />
                    <p className="selected-value">
                      {PickUp
                        ? `${dayjs(PickUp)?.format('HH:mm')}-${dayjs(PickUp)
                            ?.add(1, 'hours')
                            .format('HH:mm')}`
                        : 'Select time'}
                    </p>
                  </div>
                </div>
                <div className="select-date-time sm:pl-4 lg:pl-7">
                  <DatePickerButton
                    onChange={handleDropOffTimeChange}
                    id="drop-off-date-time-picker"
                    icon={<DateRangeIcon />}
                    text="Drop off time"
                    initialValue={dayjs(DropOff)}
                  />
                  <div className="mb-2 flex items-center">
                    <DateRangeIcon className="mr-2 text-xl" />
                    <p className="selected-value">
                      {DropOff
                        ? dayjs(DropOff).format('ddd, MMM D, YYYY')
                        : 'Select a date'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <AccessTimeIcon className="mr-2 text-xl" />
                    <p className="selected-value">
                      {DropOff
                        ? `${dayjs(DropOff)?.format('HH:mm')}-${dayjs(DropOff)
                            ?.add(1, 'hours')
                            .format('HH:mm')}`
                        : 'Select time'}
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
                  <p className="value">
                    ${Number(cartData?.totalAmount ?? 0).toFixed(2)}
                  </p>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="key">Discount</p>
                  <p className="value">$0.00</p>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="key">
                    HST {Number(cartData?.gstPercentage ?? 0).toFixed(0)}%
                  </p>
                  <p className="value">
                    {Number(cartData?.gstAmount ?? 0).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="grand-total">
                <p className="key">Grand Total</p>
                <p className="value">
                  ${Number(cartData?.grandTotal ?? 0).toFixed(2)}
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
      {payFastFormData ? (
        <PayFastForm
          token={payFastFormData.token}
          totalPrice={payFastFormData.totalPrice}
          phoneNumber={payFastFormData.phoneNumber}
          emailAddress={payFastFormData.emailAddress}
          items={payFastFormData.items}
          successURL={payFastFormData.successURL}
          failureURL={payFastFormData.failureURL}
          webHookURL={payFastFormData.webHookURL}
          orderId={payFastFormData.orderId}
          currencyType={payFastFormData.currencyType}
          userName={payFastFormData.userName}
          merchantId={payFastFormData.merchantId}
          merchantName={payFastFormData.merchantName}
          generatedDateTime={payFastFormData.generatedDateTime}
          formSubmitButtonRef={formSubmitButtonRef}
        />
      ) : null}
    </LocalizationProvider>
  );
}

export default MyBasketPage;
