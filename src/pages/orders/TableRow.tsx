import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';

type Status =
  | 'PLACE_ORDER'
  | 'ORDER_PICKED'
  | 'OUT_FOR_DELIVERY'
  | 'CANCELLED'
  | 'DROP_OFF'
  | 'DELIVERED';

type Props = {
  id: string;
  type: Status;
  date: Date;
  progress: number;
  item: number;
};

function getProgressClasses(type: Status) {
  const temp = 'relative inline-flex';
  if (type === 'PLACE_ORDER') {
    return `${temp} icon-order-placed`;
  }
  if (type === 'ORDER_PICKED') {
    return `${temp} icon-order-picked-up`;
  }
  if (type === 'OUT_FOR_DELIVERY') {
    return `${temp} icon-order-out-for-delivery`;
  }
  if (type === 'CANCELLED') {
    return `${temp} icon-order-cancelled`;
  }
  if (type === 'DROP_OFF') {
    return `${temp} icon-order-drop-off`;
  }
  if (type === 'DELIVERED') {
    return `${temp} icon-order-delivered`;
  }
  return `${temp} icon-order-delivered`;
}

function getIcon(type: Status) {
  if (type === 'PLACE_ORDER') {
    return <AssignmentTurnedInOutlinedIcon className="text-base" />;
  }
  if (type === 'ORDER_PICKED') {
    return <FilterNoneOutlinedIcon className="text-base" />;
  }
  if (type === 'OUT_FOR_DELIVERY') {
    return <LocationOnOutlinedIcon className="text-base" />;
  }
  if (type === 'CANCELLED') {
    return <DomainVerificationOutlinedIcon className="text-base" />;
  }
  if (type === 'DROP_OFF') {
    return <LocationOnOutlinedIcon className="text-base" />;
  }
  if (type === 'DELIVERED') {
    return <DomainVerificationOutlinedIcon className="text-base" />;
  }
  return <AssignmentTurnedInOutlinedIcon className="text-base" />;
}

function getStatusText(type: Status) {
  if (type === 'PLACE_ORDER') {
    return 'Place Order';
  }
  if (type === 'ORDER_PICKED') {
    return 'Order Picked Up';
  }
  if (type === 'OUT_FOR_DELIVERY') {
    return 'Out For Delivery';
  }
  if (type === 'CANCELLED') {
    return 'Cancelled';
  }
  if (type === 'DROP_OFF') {
    return 'Drop Off';
  }
  if (type === 'DELIVERED') {
    return 'Delivered';
  }
  return 'Place Order';
}
function getStatusClasses(type: Status) {
  const statusClass = 'order-status';
  if (type === 'PLACE_ORDER') {
    return `${statusClass} bg-order-placed`;
  }
  if (type === 'ORDER_PICKED') {
    return `${statusClass} bg-order-picked-up`;
  }
  if (type === 'OUT_FOR_DELIVERY') {
    return `${statusClass} bg-order-out-for-delivery`;
  }
  if (type === 'CANCELLED') {
    return `${statusClass} bg-order-cancelled`;
  }
  if (type === 'DROP_OFF') {
    return `${statusClass} bg-order-drop-off`;
  }
  if (type === 'DELIVERED') {
    return `${statusClass} bg-order-delivered`;
  }
  return `${statusClass} bg-order-delivered`;
}

function TableRow({ id, type, date, progress, item }: Props) {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-x-10">
          <div className={getProgressClasses(type)}>
            <CircularProgress
              className="z-10"
              variant="determinate"
              value={progress}
              color="inherit"
            />
            <CircularProgress
              className="absolute z-0 text-neutral-200"
              variant="determinate"
              value={100}
              color="inherit"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {getIcon(type)}
            </div>
          </div>
          <NavLink to={id} className="order-id">{id}</NavLink>
        </div>
      </td>
      <td>
        {dayjs(date).format('HH:mm , DD-MM-YYYY')}
      </td>
      <td>
        <div className={getStatusClasses(type)}>{getStatusText(type)}</div>
      </td>
      <td>
        {item} Items
      </td>
      <td>
        <NavLink to={id} className='link'>Track Order</NavLink>
      </td>
    </tr>
  );
}

export default TableRow;
