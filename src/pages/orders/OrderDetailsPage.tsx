import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DatePickerButton from '../my-basket/DatePickerButton';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import OrderDetailsPagePopup from './OrderDetailsPagePopup';
import assets from '../../assets';

function OrderDetailsPage() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const params = useParams();
  const [pickUpTime, setPickUpTime] = useState<dayjs.Dayjs | null>(null);
  const [dropOffTime, setDropOffTime] = useState<dayjs.Dayjs | null>(null);
  const handlePickUpTimeChange = (value: dayjs.Dayjs | null) => {
    setPickUpTime(value);
  };
  const handleDropOffTimeChange = (value: dayjs.Dayjs | null) => {
    setDropOffTime(value);
  };
  return (
    <>
      <OrderDetailsPagePopup open={dialogOpen} setOpen={setDialogOpen} />

      <div className="p-4 sm:p-5 xl:p-7 order-details-page">
        <div className="flex items-center mb-4 md:mb-6">
          <IconButton
            onClick={() => navigate(-1)}
            color="inherit"
            className="p-1"
          >
            <ArrowBackIcon />
          </IconButton>
          <h4 className="page-heading">
            Order Details
          </h4>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-5">
          <div className="order-details-card">
            <div className="px-5 pt-6 pb-1">
              <div className="sm:flex items-center justify-between gap-x-5">
                <div className="flex items-center gap-x-3 mb-5 sm:mb-0">
                  <div className="relative inline-flex icon-order-out-for-delivery">
                    <CircularProgress
                      thickness={1.5}
                      className="z-10"
                      size="4rem"
                      variant="determinate"
                      value={80}
                      color="inherit"
                    />
                    <CircularProgress
                      thickness={1.5}
                      className="absolute z-0 text-neutral-200"
                      size="4rem"
                      variant="determinate"
                      value={100}
                      color="inherit"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <LocationOnOutlinedIcon className="text-3xl" />
                    </div>
                  </div>
                  <div className="basic-details">
                    <p className='order-id'>
                      Order Id:&nbsp;<span>{params.id}</span>
                    </p>
                    <p className="order-date-time">
                      08:35 , 05-01-2020
                    </p>
                    <h6 className="order-status order-out-for-delivery">
                      Out For Delivery
                    </h6>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setDialogOpen(true)}
                  className="btn-cancel-order"
                  color="inherit"
                >
                  Cancel Order
                </Button>
              </div>
              <hr className="my-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="edit-date-time sm:pr-4 mb-5">
                  <div className="flex items-center justify-between mb-3.5">
                    <p className='label'>Pick Up Time</p>
                    <DatePickerButton 
                      onChange={handlePickUpTimeChange}
                      id=""
                      icon={<ModeEditOutlineOutlinedIcon />}
                      text=""
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <DateRangeIcon className="text-xl" />
                    <p className='selected-value'>{dayjs()?.format('ddd, MMM MM, YYYY')}</p>
                  </div>
                  <div className="flex items-center gap-3 mb-5 sm:mb-0">
                    <AccessTimeIcon className="text-xl" />
                    <p className="selected-value">
                      {dayjs()?.format('HH:mm')} -
                      {dayjs()?.add(1, 'hours').format('HH:mm')}
                    </p>
                  </div>
                </div>
                <div className="edit-date-time sm:pl-6">
                  <div className="flex items-center justify-between mb-3.5">
                    <p className='label'>Drop Off Time</p>
                    <DatePickerButton
                      onChange={handleDropOffTimeChange}
                      id=""
                      icon={<ModeEditOutlineOutlinedIcon />}
                      text=""
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <DateRangeIcon className="text-xl" />
                    <p className='selected-value'>{dayjs()?.format('ddd, MMM MM, YYYY')}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <AccessTimeIcon className="text-xl" />
                    <p className="selected-value">
                      {dayjs()?.format('HH:mm')} -
                      {dayjs()?.add(1, 'hours').format('HH:mm')}
                    </p>
                  </div>
                </div>
              </div>

              <div className='overflow-x-auto'>
                <table className='ordered-items-table'>
                  <tr>
                    <td colSpan={3}>
                      <div className="flex items-center gap-x-2">
                        <LocationOnOutlinedIcon className="text-xl" />
                        <p className="adress">
                          2003 | 750 Bay Street
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div className="flex items-center gap-x-2">
                        <CreditCardOutlinedIcon className="text-xl" />
                        <p className='card-number'>**** **** **** 6584</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex items-center gap-x-2 sm:gap-x-4">
                        <img
                          className="order-pic"
                          src={assets.tempImages.wash}
                          alt=""
                        />
                        <p className="name">
                          Wash & Fold 15 Lbs
                        </p>
                      </div>
                    </td>
                    <td>3 Items</td>
                    <td>
                      <p className="price">
                          $150.00
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex items-center gap-x-2 sm:gap-x-4">
                        <img
                          className="order-pic"
                          src={assets.tempImages.shirt}
                          alt=""
                        />
                        <p className="name">Shirts</p>
                      </div>
                    </td>
                    <td>5 Items</td>
                    <td>
                      <p className="price">$150.00</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex items-center gap-x-2 sm:gap-x-4">
                        <img
                          className="order-pic"
                          src={assets.tempImages.pants}
                          alt=""
                        />
                        <p className="name">
                        Blazers
                        </p>
                      </div>
                    </td>
                    <td>1 Items</td>
                    <td>
                      <p className="price">$200.00</p>
                    </td>
                  </tr>
                </table>
              </div>

              <div className="sub-total">
                <div className="flex items-center justify-between mb-2.5">
                  <p className='key'>Total Amount</p>
                  <p className='value'>$400.00</p>
                </div>
                <div className="flex items-center justify-between mb-2.5">
                  <p className='key'>Discount</p>
                  <p className='value'>$18.00</p>
                </div>
                <div className="flex items-center justify-between mb-2.5">
                  <p className='key'>HST 13%</p>
                  <p className='value'>$31.20</p>
                </div>
              </div>
              
            </div>

            <div className="grand-total">
              <div className="key">
                Grand Total
              </div>
              <div className="value">
                $449.00
              </div>
            </div>

          </div>

          <div className="order-progress-card">
            <div className="header">
                <div className="icon">
                  <LocalShippingOutlinedIcon className="text-xl" />
                </div>
                <h6 className="heading">
                  Your order is in progress...
                </h6>
            </div>
            <div className="body">

            <div className="timeline-item">
                <div className='dot'>
                  <CheckCircleOutlineOutlinedIcon />
                </div>
                <div className="relative inline-flex order-placed">
                  <CircularProgress
                    thickness={1.5}
                    className="circular-icon"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AssignmentTurnedInOutlinedIcon className="text-base md:text-xl" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h6 className="status-title order-placed">
                    Placed Order
                  </h6>
                  <p className="status-desc">
                    We have received your order
                  </p>
                </div>
                <p className="date">
                  {dayjs().format('HH:mm, MMM DD, YY')}
                </p>
              </div>

              <div className="timeline-item">
                <div className='dot'>
                  <CheckCircleOutlineOutlinedIcon />
                </div>
                <div className="relative inline-flex order-picked-up">
                  <CircularProgress
                    thickness={1.5}
                    className="circular-icon"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                  <FilterNoneOutlinedIcon className="text-base md:text-xl" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h6 className="status-title order-picked-up">
                    Order Picked Up
                  </h6>
                  <p className="status-desc">
                    Your order has been collected
                  </p>
                </div>
                <p className="date">
                  {dayjs().format('HH:mm, MMM DD, YY')}
                </p>
              </div>

              <div className="timeline-item">
                <div className='dot'>
                  <CheckCircleOutlineOutlinedIcon />
                </div>
                <div className="relative inline-flex order-out-for-delivery">
                  <CircularProgress
                    thickness={1.5}
                    className="circular-icon"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                  <LocationOnOutlinedIcon className="text-base md:text-xl" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h6 className="status-title order-out-for-delivery">
                    Order Out For Delivery
                  </h6>
                  <p className="status-desc">
                    Your order is out for delivery
                  </p>
                </div>
                <p className="date">
                  {dayjs().format('HH:mm, MMM DD, YY')}
                </p>
              </div>

              <div className="timeline-item disabled">
                <div className='dot'>
                  <CircleOutlinedIcon />
                </div>
                <div className="relative inline-flex order-drop-off">
                  <CircularProgress
                    thickness={1.5}
                    className="circular-icon"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                  <DomainVerificationOutlinedIcon className="text-base md:text-xl" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h6 className="status-title order-drop-off">
                    Order Drop Off
                  </h6>
                  <p className="status-desc">
                    Your order has been dropped
                  </p>
                </div>
                <p className="date">
                  {dayjs().format('HH:mm, MMM DD, YY')}
                </p>
              </div>

              <div className="timeline-item disabled">
                <div className='dot'>
                  <CircleOutlinedIcon />
                </div>
                <div className="relative inline-flex order-delivered">
                  <CircularProgress
                    thickness={1.5}
                    className="circular-icon"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                  <AccessTimeIcon className="text-base md:text-xl" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h6 className="status-title order-delivered">
                    Order Delivered
                  </h6>
                  <p className="status-desc">
                    Your order has been delivered
                  </p>
                </div>
                <p className="date">
                  {dayjs().format('HH:mm, MMM DD, YY')}
                </p>
              </div>

              <div className="timeline-item disabled">
                <div className='dot'>
                  <CircleOutlinedIcon />
                </div>
                <div className="relative inline-flex order-cancelled">
                  <CircularProgress
                    thickness={1.5}
                    className="circular-icon"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                  <DomainVerificationOutlinedIcon className="text-base md:text-xl" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h6 className="status-title order-cancelled">
                    Order Cancelled
                  </h6>
                  <p className="status-desc">
                    Your order has been cancelled
                  </p>
                </div>
                <p className="date">
                  {dayjs().format('HH:mm, MMM DD, YY')}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetailsPage;
