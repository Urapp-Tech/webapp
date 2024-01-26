import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import { ORDER_STATUSES } from '../../utilities/constant';
import cn from '../../utilities/class-names';

type Status =
  | 'New'
  | 'Processing'
  | 'In-Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'PickedUp';

type Props = {
  id: string;
  type: Status;
  date: Date;
  progress: number;
  item: Array<any>;
  appOrderNumber: 'string';
};

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
  const statusClass =
    'inline-flex min-h-8 min-w-32 items-center text-xs font-semibold';
  if (type === 'New') {
    return `${statusClass} text-[#4283f4]`;
  }
  if (type === 'Processing') {
    return `${statusClass} text-[#c367f1]`;
  }
  if (type === 'In-Delivery') {
    return `${statusClass} text-[#2cd285]`;
  }
  if (type === 'Delivered') {
    return `${statusClass} text-[#ff8c39]`;
  }
  if (type === 'Cancelled') {
    return `${statusClass} text-[#ee0404]`;
  }
  if (type === 'PickedUp') {
    return `${statusClass} text-[#c367f1]`;
  }
  return `${statusClass} text-[#fd2f2f]`;
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

function TableRow({ id, appOrderNumber, type, date, progress, item }: Props) {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-x-10">
          {ORDER_STATUSES.map(
            (status, index) =>
              type === status.status && (
                <div
                  className={cn(
                    'relative inline-flex',
                    type === 'New' && 'text-[#4283f4]',
                    type === 'Processing' && 'text-[#2cd285]',
                    type === 'In-Delivery' && 'text-[#fd2f2f]',
                    type === 'Delivered' && 'text-[#ff8c39]',
                    type === 'Cancelled' && 'text-[#ee0404]',
                    type === 'PickedUp' && 'text-[#c367f1]'
                  )}
                  key={index}
                >
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
            {appOrderNumber}
          </NavLink>
        </div>
      </td>
      <td>{dayjs(date).format('HH:mm , DD-MM-YYYY')}</td>
      <td>
        <div
          className={cn(
            'inline-flex min-h-8 min-w-32 items-center text-xs font-semibold',
            type === 'New' && 'text-[#4283f4]',
            type === 'Processing' && 'text-[#c367f1]',
            type === 'In-Delivery' && 'text-[#2cd285]',
            type === 'Delivered' && 'text-[#ff8c39]',
            type === 'Cancelled' && 'text-[#ee0404]',
            type === 'PickedUp' && 'text-[#c367f1]'
          )}
        >
          {getStatusText(type)}
        </div>
      </td>
      <td>{item} Items</td>
      <td>
        <NavLink
          to={id}
          className="rounded-md bg-[#4283f4] px-4 py-2 text-white"
        >
          Track Order
        </NavLink>
      </td>
    </tr>
  );
}

export default TableRow;
