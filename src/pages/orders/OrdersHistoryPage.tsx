import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';

const rows = [
  {
    id: 'EZ-45857',
    type: 'PLACE_ORDER',
    date: dayjs().add(1, 'day').toDate(),
    progress: 10,
    item: 3,
  },
  {
    id: 'EZ-45858',
    type: 'ORDER_PICKED',
    date: dayjs().add(2, 'day').toDate(),
    progress: 20,
    item: 5,
  },
  {
    id: 'EZ-45859',
    type: 'OUT_FOR_DELIVERY',
    date: dayjs().add(3, 'day').toDate(),
    progress: 30,
    item: 1,
  },
  {
    id: 'EZ-45860',
    type: 'CANCELLED',
    date: dayjs().add(4, 'day').toDate(),
    progress: 40,
    item: 3,
  },
  {
    id: 'EZ-45861',
    type: 'PLACE_ORDER',
    date: dayjs().add(5, 'day').toDate(),
    progress: 50,
    item: 12,
  },
  {
    id: 'EZ-45862',
    type: 'ORDER_PICKED',
    date: dayjs().add(6, 'day').toDate(),
    progress: 60,
    item: 3,
  },
  {
    id: 'EZ-45863',
    type: 'DROP_OFF',
    date: dayjs().add(7, 'day').toDate(),
    progress: 70,
    item: 1,
  },
  {
    id: 'EZ-45864',
    type: 'DELIVERED',
    date: dayjs().add(8, 'day').toDate(),
    progress: 80,
    item: 3,
  },
  {
    id: 'EZ-45865',
    type: 'PLACE_ORDER',
    date: dayjs().add(9, 'day').toDate(),
    progress: 90,
    item: 8,
  },
  {
    id: 'EZ-45866',
    type: 'ORDER_PICKED',
    date: dayjs().add(10, 'day').toDate(),
    progress: 100,
    item: 3,
  },
  {
    id: 'EZ-45867',
    type: 'PLACE_ORDER',
    date: dayjs().add(11, 'day').toDate(),
    progress: 10,
    item: 3,
  },
];

function generateRowsFromData(row: any) {
  let progressClasses = 'relative mr-4 inline-flex text-blue-500';
  let icon = <AssignmentTurnedInOutlinedIcon className="text-base" />;
  let text = 'Place Order';
  let statusClasses =
    'inline-block w-32 rounded-md bg-blue-500 py-2 text-center font-open-sans text-xs font-semibold text-gray-50';
  if (row.type === 'PLACE_ORDER') {
    progressClasses = 'relative mr-4 inline-flex text-blue-500';
    icon = <AssignmentTurnedInOutlinedIcon className="text-base" />;
    text = 'Place Order';
    statusClasses =
      'inline-block w-32 rounded-md bg-blue-500 py-2 text-center font-open-sans text-xs font-semibold text-gray-50';
  }
  if (row.type === 'ORDER_PICKED') {
    progressClasses = 'relative mr-4 inline-flex text-purple-500';
    icon = <FilterNoneOutlinedIcon className="text-base" />;
    text = 'Order Picked Up';
    statusClasses =
      'inline-block w-32 rounded-md bg-purple-500 py-2 text-center font-open-sans text-xs font-semibold text-gray-50';
  }
  if (row.type === 'OUT_FOR_DELIVERY') {
    progressClasses = 'relative mr-4 inline-flex text-green-500';
    icon = <LocationOnOutlinedIcon className="text-base" />;
    text = 'Out For Delivery';
    statusClasses =
      'inline-block w-32 rounded-md bg-green-500 py-2 text-center font-open-sans text-xs font-semibold text-gray-50';
  }
  if (row.type === 'CANCELLED') {
    progressClasses = 'relative mr-4 inline-flex text-red-500';
    icon = <DomainVerificationOutlinedIcon className="text-base" />;
    text = 'Cancelled';
    statusClasses =
      'inline-block w-32 rounded-md bg-red-500 py-2 text-center font-open-sans text-xs font-semibold text-gray-50';
  }
  if (row.type === 'DROP_OFF') {
    progressClasses = 'relative mr-4 inline-flex text-orange-500';
    icon = <LocationOnOutlinedIcon className="text-base" />;
    text = 'Drop Off';
    statusClasses =
      'inline-block w-32 rounded-md bg-orange-500 py-2 text-center font-open-sans text-xs font-semibold text-gray-50';
  }
  if (row.type === 'DELIVERED') {
    progressClasses = 'relative mr-4 inline-flex text-gray-500';
    icon = <DomainVerificationOutlinedIcon className="text-base" />;
    text = 'Delivered';
    statusClasses =
      'inline-block w-32 rounded-md bg-gray-500 py-2 text-center font-open-sans text-xs font-semibold text-gray-50';
  }

  return (
    <tr key={row.id} className="h-16">
      <td className="text-start">
        <div className="flex items-center">
          <div className={progressClasses}>
            <CircularProgress
              className="z-10"
              variant="determinate"
              value={row.progress}
              color="inherit"
            />
            <CircularProgress
              className="absolute z-0 text-neutral-200"
              variant="determinate"
              value={100}
              color="inherit"
            />
            <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
              {icon}
            </div>
          </div>
          <div className="font-open-sans text-sm font-semibold text-neutral-900">
            {row.id}
          </div>
        </div>
      </td>
      <td className="text-start font-open-sans text-xs font-normal text-neutral-900">
        {dayjs(row.date).format('HH:mm , DD-MM-YYYY')}
      </td>
      <td className="h-full align-middle">
        <div className="flex h-full w-full items-center justify-center">
          <div className={statusClasses}>{text}</div>
        </div>
      </td>
      <td className="text-end font-open-sans text-xs font-normal text-neutral-500">
        {row.item} Items
      </td>
      <td className="text-end font-open-sans text-xs font-normal text-neutral-900">
        Track Order
      </td>
    </tr>
  );
}

function OrdersPage() {
  return (
    <div className="container px-5 py-5">
      <div className="flex items-center justify-between">
        <div className="font-open-sans text-2xl font-semibold text-neutral-900">
          Order History
        </div>
        <FormControl className="w-96 rounded-xl bg-gray-50 shadow-md">
          <Input
            className="m-0 px-3 py-2 font-open-sans text-base font-semibold text-neutral-900"
            id="search"
            type="text"
            disableUnderline
            inputProps={{ placeholder: 'Search' }}
            endAdornment={<SearchOutlinedIcon />}
          />
        </FormControl>
      </div>
      <div className="my-4 rounded-xl bg-gray-50 px-4 py-4 shadow-md">
        <table className="w-full table-auto">
          <thead className="">
            <tr className="h-10">
              <th className="text-start font-open-sans text-base font-semibold text-neutral-900">
                Order ID
              </th>
              <th className="text-start font-open-sans text-base font-semibold text-neutral-900">
                Date & Time
              </th>
              <th className="text-center font-open-sans text-base font-semibold text-neutral-900">
                Status
              </th>
              <th className="text-end font-open-sans text-base font-semibold text-neutral-900">
                Items
              </th>
              <th className="text-end font-open-sans text-base font-semibold text-neutral-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{rows.map((row) => generateRowsFromData(row))}</tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;
