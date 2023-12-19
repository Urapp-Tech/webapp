import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { AlertColor } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertBox from '../../components/common/SnackBar';
import { useAppSelector } from '../../redux/redux-hooks';
import orderService from '../../services/order.service';
import { GetOrderListData } from '../../types/order.types';
import cn from '../../utilities/class-names';
import { ORDER_STATUS, ORDER_STATUSES } from '../../utilities/constant';
import { getItem } from '../../utilities/local-storage';
import promiseHandler from '../../utilities/promise-handler';
import DatePickerButton from '../my-basket/DatePickerButton';
import OrderDetailsPagePopup from './OrderDetailsPagePopup';

function OrderDetailsPage() {
  const user = useAppSelector((state) => state.authState.user);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [orderItemDetail, setOrderItemDetail] = useState<any>();
  const [pickUpTime, setPickUpTime] = useState<dayjs.Dayjs | null>(null);
  const [dropOffTime, setDropOffTime] = useState<dayjs.Dayjs | null>(null);
  const [alertMsg, setAlertMsg] = useState<any>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
  const [orderCanceled, setOrderCanceled] = useState(false);
  const items = getItem<GetOrderListData>('ORDER_ITEM');
  const address = getItem('ADDRESS');
  const addressList = address.map((el: any) => el);
  const { id } = useParams();
  const userAddress = addressList?.find(
    (tempAddress: any) => tempAddress.id === orderItemDetail?.appUserAddress
  );

  const getOrderDetails = useCallback(async function () {
    if (!items) {
      return;
    }
    const details = items.orders.find((order) => order.id === id);
    if (!details) {
      return;
    }
    const getOrderDetailsPromise = orderService.orderDetail(details.id);
    const [getOrderDetailsResult, getOrderDetailsError] = await promiseHandler(
      getOrderDetailsPromise
    );
    if (!getOrderDetailsResult) {
      setAlertSeverity('error');
      setAlertMsg(getOrderDetailsError.message);
      setShowAlert(true);
      return;
    }
    if (!getOrderDetailsResult.data.success) {
      setAlertSeverity('error');
      setAlertMsg(getOrderDetailsResult.data.message);
      setShowAlert(true);
      return;
    }
    setOrderItemDetail(getOrderDetailsResult.data.data);
  }, []);

  useEffect(() => {
    if (user) {
      getOrderDetails();
    }
  }, []);

  const HandleCancelOrder = () => {
    setDialogOpen(true);
    setOrderCanceled(true);
  };

  const getIcon = ORDER_STATUSES.map((status: any, index) => {
    let icon;
    if (status.iconText === 'AssignmentTurnedInOutlinedIcon') {
      icon = (
        <AssignmentTurnedInOutlinedIcon className={`text-xl ${status.color}`} />
      );
    } else if (status.iconText === 'FilterNoneOutlinedIcon') {
      icon = <FilterNoneOutlinedIcon className={`text-xl ${status.color}`} />;
    } else if (status.iconText === 'LocationOnOutlinedIcon') {
      icon = <LocationOnOutlinedIcon className={`text-xl ${status.color}`} />;
    } else if (status.iconText === 'DomainVerificationOutlinedIcon') {
      icon = (
        <DomainVerificationOutlinedIcon className={`text-xl ${status.color}`} />
      );
    } else if (status.iconText === 'AccessTimeIcon') {
      icon = <AccessTimeIcon className={`text-xl ${status.color}`} />;
    }

    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        key={index}
      >
        {icon}
      </div>
    );
  });

  const getColorFromCode = (colorCode: any) => {
    if (colorCode.includes('blue')) {
      return 'primary';
    }
    if (colorCode.includes('purple')) {
      return 'secondary';
    }
    if (colorCode.includes('green')) {
      return 'success';
    }
    if (colorCode.includes('orange')) {
      return 'warning';
    }
    if (colorCode.includes('yellow')) {
      return 'inherit';
    }
    if (colorCode.includes('red')) {
      return 'error';
    }
    return 'primary'; // Default to 'primary' if not recognized
  };
  return (
    <>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverity={alertSeverity}
          alertOpen={showAlert}
          setAlertOpen={setShowAlert}
        />
      )}
      <OrderDetailsPagePopup open={dialogOpen} setOpen={setDialogOpen} />

      <div className="order-details-page p-4 sm:p-5 xl:p-7">
        <div className="mb-4 flex items-center md:mb-6">
          <IconButton
            onClick={() => navigate(-1)}
            color="inherit"
            className="p-1"
          >
            <ArrowBackIcon />
          </IconButton>
          <h4 className="page-heading">Order Details</h4>
        </div>

        <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-2">
          <div className="order-details-card">
            <div className="px-5 pb-1 pt-6">
              <div className="items-center justify-between gap-x-5 sm:flex">
                <div className="mb-5 flex items-center gap-x-3 sm:mb-0">
                  {ORDER_STATUSES.map(
                    (status, index) =>
                      orderItemDetail?.status === status.status && (
                        <div
                          className="icon-order-out-for-delivery relative inline-flex"
                          key={index}
                        >
                          <CircularProgress
                            thickness={1.5}
                            className="z-10"
                            size="4rem"
                            variant="determinate"
                            value={(index + 1) * (100 / 6)}
                            color={getColorFromCode(status.color)}
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
                            {getIcon[index]}
                          </div>
                        </div>
                      )
                  )}
                  <div className="basic-details">
                    <p className="order-id">
                      Order Id:&nbsp;
                      <span>{orderItemDetail?.appOrderNumber}</span>
                    </p>
                    <p className="order-date-time">08:35 , 05-01-2020</p>
                    <h6 className="order-status order-out-for-delivery">
                      {orderItemDetail?.status}
                    </h6>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={HandleCancelOrder}
                  className="btn-cancel-order"
                  color="inherit"
                  disabled={
                    orderItemDetail?.status === ORDER_STATUS.IN_DELIVERY
                  }
                >
                  Cancel Order
                </Button>
              </div>
              <hr className="my-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="edit-date-time mb-5 sm:pr-4">
                  <div className="mb-3.5 flex items-center justify-between">
                    <p className="label">Pick Up Time</p>
                    {/* <ModeEditOutlineOutlinedIcon /> */}
                  </div>
                  <div className="mb-3 flex items-center gap-3">
                    <DateRangeIcon className="text-xl" />
                    <p className="selected-value">
                      {orderItemDetail?.pickupDateTime}
                    </p>
                  </div>
                  <div className="mb-5 flex items-center gap-3 sm:mb-0">
                    <AccessTimeIcon className="text-xl" />
                    <p className="selected-value">
                      {dayjs()?.format('HH:mm')} -
                      {dayjs()?.add(1, 'hours').format('HH:mm')}
                    </p>
                  </div>
                </div>
                <div className="edit-date-time sm:pl-6">
                  <div className="mb-3.5 flex items-center justify-between">
                    <p className="label">Drop Off Time</p>
                    {/* <ModeEditOutlineOutlinedIcon /> */}
                  </div>
                  <div className="mb-3 flex items-center gap-3">
                    <DateRangeIcon className="text-xl" />
                    <p className="selected-value">
                      {orderItemDetail?.dropDateTime}
                    </p>
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

              <div className="overflow-x-auto">
                <table className="ordered-items-table">
                  <tr>
                    <td colSpan={3}>
                      <div className="flex items-center gap-x-2">
                        <LocationOnOutlinedIcon className="text-xl" />
                        <p className="adress">
                          {!userAddress
                            ? 'No Address Active'
                            : userAddress?.address}
                        </p>
                      </div>
                    </td>
                  </tr>
                  {orderItemDetail?.appOrderItem.map(
                    (el: any, index: number) => (
                      <tr key={index}>
                        <td>
                          <div className="flex items-center gap-x-2 sm:gap-x-4">
                            <img className="order-pic" src={el.icon} alt="" />
                            <p className="name">{el.name}</p>
                          </div>
                        </td>
                        <td>{el.quantity} Items</td>
                        <td>
                          <p className="price">{el.unitPrice}</p>
                        </td>
                      </tr>
                    )
                  )}
                </table>
              </div>

              <div className="total-amount">
                <div className="mb-4 flex items-center justify-between">
                  <p className="key">Total Amount</p>
                  <p className="value">${orderItemDetail?.totalAmount}</p>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="key">Discount</p>
                  <p className="value">$0.00</p>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="key">HST {orderItemDetail?.gstPercentage}%</p>
                  <p className="value">${orderItemDetail?.gstAmount}</p>
                </div>
              </div>
            </div>

            <div className="grand-total">
              <p className="key">Grand Total</p>
              <p className="value">${orderItemDetail?.grandTotal}</p>
            </div>
          </div>

          <div className="order-progress-card">
            <div className="header">
              <div className="icon">
                <LocalShippingOutlinedIcon className="text-xl" />
              </div>
              <h6 className="heading">Your order is in progress...</h6>
            </div>
            <div className="body">
              {ORDER_STATUSES.map((el, index) => (
                <div
                  className={cn('timeline-item', {
                    disabled:
                      index >
                        ORDER_STATUSES.findIndex(
                          (status) => status.status === orderItemDetail?.status
                        ) ||
                      (orderCanceled &&
                        index >
                          ORDER_STATUSES.findIndex(
                            (status) =>
                              status.status === orderItemDetail?.status
                          )),
                  })}
                  key={index}
                >
                  <div className="dot">
                    {index !==
                    ORDER_STATUSES.findIndex(
                      (status) =>
                        status.status === orderItemDetail?.status &&
                        index >
                          ORDER_STATUSES.findIndex(
                            (SecondStatus) =>
                              SecondStatus.status === orderItemDetail?.status
                          )
                    ) ? (
                      <CheckCircleOutlineOutlinedIcon />
                    ) : (
                      <CircleOutlinedIcon />
                    )}
                  </div>
                  <div className="order-placed relative inline-flex">
                    <CircularProgress
                      thickness={1.5}
                      className="circular-icon"
                      variant="determinate"
                      value={100}
                      color={getColorFromCode(el.color)}
                    />
                    <div>{getIcon[index]}</div>
                  </div>
                  <div className="flex-grow">
                    <h6 className={`status-title ${el.color}`}>{el.title}</h6>
                    <p className="status-desc">{el.text}</p>
                  </div>
                  <p className="date">{dayjs().format('HH:mm, MMM DD, YY')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetailsPage;
