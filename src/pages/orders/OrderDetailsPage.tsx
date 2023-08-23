import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DateRangeIcon from '@mui/icons-material/DateRange'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined'
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined'
import DatePickerButton from '../my-basket/DatePickerButton'
import OrderDetailsPagePopup from './OrderDetailsPagePopup'
import assets from '../../assets'
import { getItem } from '../../utilities/local-storage'
import { useAppSelector } from '../../redux/redux-hooks'
import AlertBox from '../../components/common/SnackBar'

function OrderDetailsPage() {
  const { cartItems }: any = useAppSelector((state) => state.cartState)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const [orderItemDetail, setOrderItemDetail] = useState<any>()
  const [pickUpTime, setPickUpTime] = useState<dayjs.Dayjs | null>(null)
  const [dropOffTime, setDropOffTime] = useState<dayjs.Dayjs | null>(null)
  const handlePickUpTimeChange = (value: dayjs.Dayjs | null) => {
    setPickUpTime(value)
  }
  const items = getItem('OrderItem')
  const address = getItem('Address')
  const AddressList = address.map((el: any) => el)
  const userAddress = AddressList.find(
    (el: any) => el.id === orderItemDetail?.appUserAddress,
  )
  const [alertMsg, setAlertMsg] = useState<any>('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const total = cartItems.reduce(
    (previousValue: any, currentValue: any) =>
      previousValue + currentValue.price * currentValue.quantity,
    0,
  )

  const orderDetail = async () => {
    try {
      const id = await window.location.pathname.slice(
        window.location.pathname.lastIndexOf('/') + 1,
      )
      const Details = items?.orders.find((el: any) => el.id === id)
      setOrderItemDetail(Details)
    } catch (error) {
      setAlertMsg(error)
          setShowAlert(true)
      setAlertSeverity('error')
    }
  }

  useEffect(() => {
    orderDetail()
  }, [])

  const handleDropOffTimeChange = (value: dayjs.Dayjs | null) => {
    setDropOffTime(value)
  }
  return (
    <>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverty={alertSeverity}
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
            <div className="px-5 pt-6 pb-1">
              <div className="items-center justify-between gap-x-5 sm:flex">
                <div className="mb-5 flex items-center gap-x-3 sm:mb-0">
                  <div className="icon-order-out-for-delivery relative inline-flex">
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
                    <p className="order-id">
                      Order Id:&nbsp;<span>{orderItemDetail?.id}</span>
                    </p>
                    <p className="order-date-time">08:35 , 05-01-2020</p>
                    <h6 className="order-status order-out-for-delivery">
                      {orderItemDetail?.status}
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
                <div className="edit-date-time mb-5 sm:pr-4">
                  <div className="mb-3.5 flex items-center justify-between">
                    <p className="label">Pick Up Time</p>
                    <DatePickerButton
                      onChange={handlePickUpTimeChange}
                      icon={<ModeEditOutlineOutlinedIcon />}
                      id=""
                      text=""
                    />
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
                    <DatePickerButton
                      onChange={handleDropOffTimeChange}
                      id=""
                      icon={<ModeEditOutlineOutlinedIcon />}
                      text=""
                    />
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
                        <p className="adress">{userAddress?.address}</p>
                      </div>
                    </td>
                  </tr>
                  {orderItemDetail?.items.map((el: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-x-2 sm:gap-x-4">
                          <img
                            className="order-pic"
                            src={assets.tempImages.wash}
                            alt=""
                          />
                          <p className="name">Wash & Fold 15 Lbs</p>
                        </div>
                      </td>
                      <td>{el.quantity} Items</td>
                      <td>
                        <p className="price">{el.unitPrice}</p>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>

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
            </div>

            <div className="grand-total">
              <p className="key">Grand Total</p>
              <p className="value">
                ${(total + (total / 100) * 13).toFixed(2)}
              </p>
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
              <div className="timeline-item">
                <div className="dot">
                  <CheckCircleOutlineOutlinedIcon />
                </div>
                <div className="order-placed relative inline-flex">
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
                  <h6 className="status-title order-placed">Placed Order</h6>
                  <p className="status-desc">We have received your order</p>
                </div>
                <p className="date">{dayjs().format('HH:mm, MMM DD, YY')}</p>
              </div>

              <div className="timeline-item">
                <div className="dot">
                  <CheckCircleOutlineOutlinedIcon />
                </div>
                <div className="order-picked-up relative inline-flex">
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
                  <p className="status-desc">Your order has been collected</p>
                </div>
                <p className="date">{dayjs().format('HH:mm, MMM DD, YY')}</p>
              </div>

              <div className="timeline-item">
                <div className="dot">
                  <CheckCircleOutlineOutlinedIcon />
                </div>
                <div className="order-out-for-delivery relative inline-flex">
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
                  <p className="status-desc">Your order is out for delivery</p>
                </div>
                <p className="date">{dayjs().format('HH:mm, MMM DD, YY')}</p>
              </div>

              <div className="timeline-item disabled">
                <div className="dot">
                  <CircleOutlinedIcon />
                </div>
                <div className="order-drop-off relative inline-flex">
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
                  <p className="status-desc">Your order has been dropped</p>
                </div>
                <p className="date">{dayjs().format('HH:mm, MMM DD, YY')}</p>
              </div>

              <div className="timeline-item disabled">
                <div className="dot">
                  <CircleOutlinedIcon />
                </div>
                <div className="order-delivered relative inline-flex">
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
                  <p className="status-desc">Your order has been delivered</p>
                </div>
                <p className="date">{dayjs().format('HH:mm, MMM DD, YY')}</p>
              </div>

              <div className="timeline-item disabled">
                <div className="dot">
                  <CircleOutlinedIcon />
                </div>
                <div className="order-cancelled relative inline-flex">
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
                  <p className="status-desc">Your order has been cancelled</p>
                </div>
                <p className="date">{dayjs().format('HH:mm, MMM DD, YY')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetailsPage
