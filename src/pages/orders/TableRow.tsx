import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import { ORDER_STATUSES } from '../../utilities/constant';

type Status = 'New' | 'Processing';

type Props = {
  id: string;
  type: Status;
  date: Date;
  progress: number;
  item: [];
};

function getProgressClasses(type: Status) {
  const temp = 'relative inline-flex';
  if (type === 'New') {
    return `${temp} icon-order-placed`;
  }
  if (type === 'Processing') {
    return `${temp} icon-order-out-for-delivery`;
  }
  if (type === 'In-Delivery') {
    return `${temp} icon-order-delivered`;
  }
  if (type === 'Delivered') {
    return `${temp} icon-order-drop-off`;
  }
  if (type === 'Cancelled') {
    return `${temp} icon-order-cancelled`;
  }
  if (type === 'PickedUp') {
    return `${temp} icon-order-picked-up`;
  }
  return `${temp} icon-order-delivered`;
}
function getStatusText(type: Status) {
  if (type === 'New') {
    return 'New';
  }
  if (type === 'Processing') {
    return 'Order In Progress';
  }
  if (type === 'In-Delivery') {
    return 'Order Is In Delivery';
  }
  if (type === 'Delivered') {
    return 'Order In Progress';
  }
  if (type === 'Cancelled') {
    return 'Order Is Cancelled';
  }
  if (type === 'PickedUp') {
    return 'Order Picked Up';
  }
  return 'New';
}

function getStatusClasses(type: Status) {
  const statusClass = 'order-status';
  if (type === 'New') {
    return `${statusClass} bg-order-placed`;
  }
  if (type === 'Processing') {
    return `${statusClass} bg-order-out-for-delivery`;
  }
  if (type === 'In-Delivery') {
    return `${statusClass} bg-order-delivered`;
  }
  if (type === 'Delivered') {
    return `${statusClass} bg-order-drop-off`;
  }
  if (type === 'Cancelled') {
    return `${statusClass} bg-order-cancelled`;
  }
  if (type === 'PickedUp') {
    return `${statusClass} bg-order-picked-up`;
  }
  return `${statusClass} bg-order-delivered`;
}

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

function TableRow({ id, type, date, progress, item }: Props) {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-x-10">
          {ORDER_STATUSES.map(
            (status, index) =>
              type === status.status && (
                <div className={getProgressClasses(type)} key={index}>
                  <CircularProgress
                    thickness={1.5}
                    className="z-10"
                    variant="determinate"
                    value={(index + 1) * (100 / 6)}
                    color={getColorFromCode(status.color)}
                  />
                  <CircularProgress
                    thickness={1.5}
                    className="absolute z-0 text-neutral-200"
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
          <NavLink to={id} className="order-id">
            {id}
          </NavLink>
        </div>
      </td>
      <td>{dayjs(date).format('HH:mm , DD-MM-YYYY')}</td>
      <td>
        <div className={getStatusClasses(type)}>{getStatusText(type)}</div>
      </td>
      <td>{item} Items</td>
      <td>
        <NavLink to={id} className="link">
          Track Order
        </NavLink>
      </td>
    </tr>
  );
}

export default TableRow;
