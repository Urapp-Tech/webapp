import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertBox from '../../components/common/SnackBar';
import useAlert from '../../hooks/alert.hook';
import { useAppSelector } from '../../redux/redux-hooks';
import orderService from '../../services/order.service';
import { GetOrderListData } from '../../types/order.types';
import cn from '../../utilities/class-names';
import { ORDER_STATUS, ORDER_STATUSES } from '../../utilities/constant';
import { getItem } from '../../utilities/local-storage';
import promiseHandler from '../../utilities/promise-handler';
import OrderDetailsPagePopup from './OrderDetailsPagePopup';

function OrderDetailsPage() {
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const user = useAppSelector((state) => state.authState.user);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [orderItemDetail, setOrderItemDetail] = useState<any>();
  const [pickUpTime, setPickUpTime] = useState<dayjs.Dayjs | null>(null);
  const [dropOffTime, setDropOffTime] = useState<dayjs.Dayjs | null>(null);
  const [orderCanceled, setOrderCanceled] = useState(false);
  const items = getItem<GetOrderListData>('ORDER_ITEM');
  const address = getItem<any>('ADDRESS');
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
      setAlertMessage(getOrderDetailsError.message);
      setShowAlert(true);
      return;
    }
    if (!getOrderDetailsResult.data.success) {
      setAlertSeverity('error');
      setAlertMessage(getOrderDetailsResult.data.message);
      setShowAlert(true);
      return;
    }
    setOrderItemDetail(getOrderDetailsResult.data.data);
  }, []);

  const cancelOrder = async () => {
    orderService
      .updateOrderStatus({
        app_order: orderItemDetail.id,
        status: ORDER_STATUS.CANCELLED,
      })
      .then((response) => {
        if (response.data.success) {
          if (user) {
            getOrderDetails();
          }
          setAlertSeverity('success');
          setAlertMessage(response.data.message);
          setShowAlert(true);
        } else {
          setAlertSeverity('error');
          setAlertMessage(response.data.message);
          setShowAlert(true);
        }
      });
  };

  const handleCancelModalAction = (value: boolean = false) => {
    if (value) {
      cancelOrder();
      setDialogOpen(false);
      return;
    }
    setDialogOpen(value);
  };

  useEffect(() => {
    if (user) {
      getOrderDetails();
    }
  }, []);

  const HandleCancelOrder = () => {
    setDialogOpen(true);
    setOrderCanceled(true);
  };

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
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
      <OrderDetailsPagePopup
        open={dialogOpen}
        setOpen={handleCancelModalAction}
      />
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
                  {[...ORDER_STATUSES.values()].map(
                    (status, index) =>
                      orderItemDetail?.status === status.status && (
                        <div
                          className="relative inline-flex text-[#2cd285]"
                          key={index}
                        >
                          <CircularProgress
                            thickness={1.5}
                            className={cn('z-10', status.color)}
                            size="4rem"
                            variant="determinate"
                            value={status.progress}
                          />
                          <CircularProgress
                            thickness={1.5}
                            className="absolute z-0 text-neutral-200"
                            size="4rem"
                            variant="determinate"
                            value={100}
                            color="inherit"
                          />
                          <div
                            className={cn(
                              'absolute inset-0 flex items-center justify-center',
                              status.color
                            )}
                          >
                            <CheckCircleOutlineOutlinedIcon />
                          </div>
                        </div>
                      )
                  )}
                  <div className="basic-details">
                    <p className="order-id">
                      Order Id:&nbsp;
                      <span>{orderItemDetail?.orderNumber}</span>
                    </p>
                    <p className="order-date-time">08:35 , 05-01-2020</p>
                    <h6 className="order-status order-out-for-delivery">
                      {orderItemDetail?.status}
                    </h6>
                  </div>
                </div>
                {orderItemDetail?.status === ORDER_STATUS.NEW && (
                  <Button
                    type="button"
                    onClick={HandleCancelOrder}
                    className="btn-cancel-order"
                    color="inherit"
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
              {/* <hr className="my-4" /> */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="edit-date-time mb-5 sm:pr-4">
                  <div className="mb-3.5 flex items-center justify-between">
                    <p className="label">Pick Up Time</p>
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
              </div> */}

              <div className="overflow-x-auto">
                <table className="ordered-items-table">
                  <thead>
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
                  </thead>
                  <tbody>
                    {orderItemDetail?.orderItems.map(
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
                  </tbody>
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
              {[...ORDER_STATUSES.values()].map((el, index) => (
                <div
                  className={cn('timeline-item', {
                    disabled: !orderItemDetail?.appOrderStatuses?.some(
                      (item: any) => item.status === el.status
                    ),
                  })}
                  key={el.status}
                >
                  <div className="dot">
                    {orderItemDetail?.appOrderStatuses?.some(
                      (item: any) => item.status === el.status
                    ) ? (
                      <CheckCircleOutlineOutlinedIcon />
                    ) : (
                      <CircleOutlinedIcon />
                    )}
                  </div>
                  <div className="order-placed relative inline-flex">
                    <CircularProgress
                      thickness={1.5}
                      className={cn('circular-icon', el.color)}
                      variant="determinate"
                      value={100}
                    />
                    <div
                      className={cn(
                        'absolute inset-0 flex items-center justify-center',
                        el.color
                      )}
                    >
                      <CheckCircleOutlineOutlinedIcon />
                    </div>
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
