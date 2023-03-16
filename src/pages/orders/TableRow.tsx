import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';

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
  const temp = 'relative mr-4 inline-flex';
  if (type === 'PLACE_ORDER') {
    return `${temp} text-blue-500`;
  }
  if (type === 'ORDER_PICKED') {
    return `${temp} text-purple-500`;
  }
  if (type === 'OUT_FOR_DELIVERY') {
    return `${temp} text-green-500`;
  }
  if (type === 'CANCELLED') {
    return `${temp} text-red-500`;
  }
  if (type === 'DROP_OFF') {
    return `${temp} text-orange-500`;
  }
  if (type === 'DELIVERED') {
    return `${temp} text-gray-500`;
  }
  return `${temp} text-blue-500`;
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
  const classes1 = 'inline-block w-32 rounded-md ';
  const classes2 =
    'py-2 text-center font-open-sans text-xs font-semibold text-gray-50';
  if (type === 'PLACE_ORDER') {
    return `${classes1} bg-blue-500 ${classes2}`;
  }
  if (type === 'ORDER_PICKED') {
    return `${classes1} bg-purple-500 ${classes2}`;
  }
  if (type === 'OUT_FOR_DELIVERY') {
    return `${classes1} bg-green-500 ${classes2}`;
  }
  if (type === 'CANCELLED') {
    return `${classes1} bg-red-500 ${classes2}`;
  }
  if (type === 'DROP_OFF') {
    return `${classes1} bg-orange-500 ${classes2}`;
  }
  if (type === 'DELIVERED') {
    return `${classes1} bg-gray-500 ${classes2}`;
  }
  return `${classes1} bg-blue-500 ${classes2}`;
}

function TableRow({ id, type, date, progress, item }: Props) {
  return (
    <tr className="h-16">
      <td className="text-start">
        <div className="flex items-center">
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
            <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
              {getIcon(type)}
            </div>
          </div>
          <div className="font-open-sans text-sm font-semibold text-neutral-900">
            {id}
          </div>
        </div>
      </td>
      <td className="text-start font-open-sans text-xs font-normal text-neutral-900">
        {dayjs(date).format('HH:mm , DD-MM-YYYY')}
      </td>
      <td className="h-full align-middle">
        <div className="flex h-full w-full items-center justify-center">
          <div className={getStatusClasses(type)}>{getStatusText(type)}</div>
        </div>
      </td>
      <td className="text-end font-open-sans text-xs font-normal text-neutral-500">
        {item} Items
      </td>
      <td className="cursor-pointer text-end font-open-sans text-xs font-normal text-neutral-900">
        <NavLink to={id}>Track Order</NavLink>
      </td>
    </tr>
  );
}

export default TableRow;
