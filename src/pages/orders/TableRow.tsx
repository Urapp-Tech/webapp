import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import cn from '../../utilities/class-names';
import { ORDER_STATUSES } from '../../utilities/constant';

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

function getProgress(type: Status) {
  if (type === 'New') {
    return 20;
  }
  if (type === 'Processing') {
    return 40;
  }
  if (type === 'In-Delivery') {
    return 80;
  }
  if (type === 'Delivered') {
    return 100;
  }
  if (type === 'Cancelled') {
    return 100;
  }
  if (type === 'PickedUp') {
    return 60;
  }
  return 20;
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
    return 'Order Delivered';
  }
  if (type === 'Cancelled') {
    return 'Order Is Cancelled';
  }
  if (type === 'PickedUp') {
    return 'Order Picked Up';
  }
  return 'New';
}

const getIcon = ORDER_STATUSES.map((status: any, index) => {
  let icon;
  if (status.iconText === 'AssignmentTurnedInOutlinedIcon') {
    icon = <AssignmentTurnedInOutlinedIcon />;
  } else if (status.iconText === 'FilterNoneOutlinedIcon') {
    icon = <FilterNoneOutlinedIcon />;
  } else if (status.iconText === 'LocationOnOutlinedIcon') {
    icon = <LocationOnOutlinedIcon />;
  } else if (status.iconText === 'DomainVerificationOutlinedIcon') {
    icon = <DomainVerificationOutlinedIcon />;
  } else if (status.iconText === 'AccessTimeIcon') {
    icon = <AccessTimeIcon />;
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
                    thickness={2}
                    className="z-10"
                    variant="determinate"
                    classes={{
                      colorPrimary: cn(
                        'relative inline-flex',
                        type === 'New' && 'text-[#4283f4]',
                        type === 'Processing' && 'text-[#2cd285]',
                        type === 'In-Delivery' && 'text-[#fd2f2f]',
                        type === 'Delivered' && 'text-[#ff8c39]',
                        type === 'Cancelled' && 'text-[#ee0404]',
                        type === 'PickedUp' && 'text-[#c367f1]'
                      ),
                    }}
                    value={getProgress(type)}
                    // color={getColorFromCode(status.color)}
                  />
                  <CircularProgress
                    thickness={2}
                    className="absolute z-0 text-neutral-200"
                    variant="determinate"
                    value={100}
                    color="inherit"
                  />
                  <div
                    className={cn(
                      'absolute inset-0 flex items-center justify-center text-lg',
                      type === 'New' && 'text-[#4283f4]',
                      type === 'Processing' && 'text-[#2cd285]',
                      type === 'In-Delivery' && 'text-[#fd2f2f]',
                      type === 'Delivered' && 'text-[#ff8c39]',
                      type === 'Cancelled' && 'text-[#ee0404]',
                      type === 'PickedUp' && 'text-[#c367f1]'
                    )}
                  >
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
