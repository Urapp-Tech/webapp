import { useState } from 'react';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DiscountIcon from '@mui/icons-material/Discount';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import DatePickerButton from './DatePickerButton';
import MyBasketPagePopup from './MyBasketPagePopup';
import { removeFromCart } from '../../redux/features/cartStateSlice';

function MyBasketPage() {
  const { cartItems } = useAppSelector((state) => state.cartState);
  const dispatch = useAppDispatch();
  const [pickUpTime, setPickUpTime] = useState<dayjs.Dayjs | null>(null);
  const [dropOffTime, setDropOffTime] = useState<dayjs.Dayjs | null>(null);
  const handlePickUpTimeChange = (value: dayjs.Dayjs | null) => {
    setPickUpTime(value);
  };
  const handleDropOffTimeChange = (value: dayjs.Dayjs | null) => {
    setDropOffTime(value);
  };
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const total = cartItems.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.quantity,
    0
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MyBasketPagePopup
        open={dialogOpen}
        setOpen={setDialogOpen}
        data={{ amount: total + (total / 100) * 13, id: 56482 }}
      />
      <div className="p-4 sm:p-5 xl:p-7 cart-page">
        <div className="flex items-center justify-start mb-4 md:mb-6">
          <h4 className="page-heading">
            My Basket
          </h4>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <div className="cart-products-card">
              <div className='overflow-x-auto'>
                <table className="cart-products-table">
                  <thead>
                    <tr>
                      <th>Products</th>
                      <th>Price</th>
                      <th>Items</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="flex items-center gap-x-5">
                            <IconButton
                              className="btn-delete"
                              onClick={() => dispatch(removeFromCart(item.id))}
                            >
                              <DeleteOutlineOutlinedIcon className="text-2xl" />
                            </IconButton>
                            <div className="product">
                              <img className="pic" src={item.image} alt="" />
                              <p className="name">{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between my-2.5 px-5">
                <div className="flex items-center">
                  <p className="promo-label">
                    Add Promo Code
                  </p>
                  <FormControl variant="standard" size="small">
                    <Input
                      className="promo-field"
                      id="input-with-icon-adornment"
                      disableUnderline
                      inputProps={{
                        placeholder: 'Enter Promo Code',
                      }}
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
                <Button className="btn-add-more" variant="outlined" color="inherit" startIcon={<ShoppingBagOutlinedIcon />}>
                  Add More to Basket
                </Button>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="cart-checkout-card">
              <div className="grid grid-cols-1 sm:grid-cols-2 mb-5">
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
                <div className='select-date-time sm:pl-4 lg:pl-7'>
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
              <div className="address-card">
                <div className="key">
                  <LocationOnOutlinedIcon className="mr-2 text-xl" />
                  <p className="text">2003 | 750 Bay Street</p>
                </div>
                <a href='#' className="value">Change</a>
              </div>
              <div className="address-card">
                <div className="key">
                  <CreditCardOutlinedIcon className="mr-2 text-xl" />
                  <p className="text">**** **** **** 6584</p>
                </div>
                <a href='#' className="value">Change</a>
              </div>
              <div className="total-amount">
                <div className="heading">
                  Total Amount
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="key">
                    Total Amount
                  </p>
                  <p className="value">
                    ${total.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="key">
                    Discount
                  </p>
                  <p className="value">
                    $0.00
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="key">
                    HST 13%
                  </p>
                  <p className="value">
                    ${((total / 100) * 13).toFixed(2)}
                  </p>
                </div>
              </div>
              <hr/>
              <div className="grand-total">
                <div className="key">
                  Grand Total
                </div>
                <div className="value">
                  ${(total + (total / 100) * 13).toFixed(2)}
                </div>
              </div>
              <Button
                type="button"
                onClick={() => setDialogOpen(true)}
                color="inherit"
                className="btn-checkout"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default MyBasketPage;
