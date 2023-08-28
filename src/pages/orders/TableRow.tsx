import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';

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
    return `${temp} icon-order-picked-up`;
  }
  return `${temp} icon-order-delivered`;
}

function getIcon(type: Status) {
  if (type === 'New') {
    return <AssignmentTurnedInOutlinedIcon className="text-base" />;
  }
  if (type === 'Processing') {
    return <FilterNoneOutlinedIcon className="text-base" />;
  }
  return <AssignmentTurnedInOutlinedIcon className="text-base" />;
}

function getStatusText(type: Status) {
  if (type === 'New') {
    return 'New';
  }
  if (type === 'Processing') {
    return 'Order In Progess';
  }

  return 'New';
}
function getStatusClasses(type: Status) {
  const statusClass = 'order-status';
  if (type === 'New') {
    return `${statusClass} bg-order-placed`;
  }
  if (type === 'Processing') {
    return `${statusClass} bg-order-picked-up`;
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
          <NavLink to={id} className="order-id">
            {id}
          </NavLink>
        </div>
      </td>
      <td>{dayjs(date).format('HH:mm , DD-MM-YYYY')}</td>
      <td>
        <div className={getStatusClasses(type)}>{getStatusText(type)}</div>
      </td>
      <td>{item.length} Items</td>
      <td>
        <NavLink to={id} className="link">
          Track Order
        </NavLink>
      </td>
    </tr>
  );
}

export default TableRow;
