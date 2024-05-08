import {
  Button,
  Divider,
  IconButton,
  MenuItem,
  Select,
  TablePagination,
  TextField,
} from '@mui/material';
import { memo, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useForm } from 'react-hook-form';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/common/TopBar';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
// import { fetchAppointments } from '../../redux/features/AppointmentSlice';
// import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader';
import { fetchAppointments } from '../../redux/features/appointmentSlice';
import CustomText from '../../components/common/CustomText';

type QueryParams = {
  tenant: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
  page?: string | null | any;
  size?: string | null | any;
  search?: string | null;
  status?: string | null;
  app_user?: string | null;
};

function StoreAppointmentsList() {
  const {
    appointments,
    total_count: total,
    loading,
  } = useAppSelector((s) => s.appointmentState);
  const { user } = useAppSelector((s) => s.authState);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('All');
  const { control, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();

  const fetchAppointmentsData = () => {
    // const { startDate, endDate } = formData;
    const startDate = getValues('startDate');
    const endDate = getValues('endDate');
    const formattedStartDate = startDate
      ? dayjs(startDate).format('YYYY-MM-DD')
      : null;
    const formattedEndDate = endDate
      ? dayjs(endDate).format('YYYY-MM-DD')
      : null;

    const queryParams: QueryParams = {
      tenant: user?.tenant,
      page,
      size: rowsPerPage,
      search,
      status,
      app_user: user?.id,
    };
    if (formattedStartDate) {
      queryParams.startDate = formattedStartDate;
    }
    if (formattedEndDate) {
      queryParams.endDate = formattedEndDate;
    }
    if (status === 'All') {
      delete queryParams.status;
    }

    dispatch(fetchAppointments(queryParams));
  };

  const handleDateChange = (date: Dayjs | Date | null | any, field: any) => {
    field.onChange(date);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
  };

  useEffect(() => {
    fetchAppointmentsData();
  }, [page, rowsPerPage]);

  return loading ? (
    <Loader />
  ) : (
    <div className="cs-dialog container mx-auto mt-5 w-full rounded-lg bg-white px-4 py-5 shadow-lg">
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex items-center md:col-span-12 md:mb-8 lg:col-span-4 lg:mb-0">
          <span className="font-open-sans text-xl font-semibold text-[#252733]">
            Appointments History
          </span>
        </div>
        <div className="col-span-12 mt-3 flex justify-end gap-3 md:col-span-12 md:mt-1 lg:col-span-8 ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form
              onSubmit={handleSubmit(fetchAppointmentsData)}
              className="grid grid-cols-12 items-center gap-3"
            >
              <Controller
                name="startDate"
                control={control}
                defaultValue={dayjs().subtract(6, 'month').toDate()}
                render={({ field }) => (
                  <DesktopDatePicker
                    {...field}
                    label="Start Date"
                    className="col-span-6 md:col-span-4"
                    format="YYYY-MM-DD"
                    value={dayjs(field.value)}
                    defaultValue={dayjs().subtract(6, 'month')}
                    onChange={(date) => handleDateChange(date, field)}
                    // renderInput={(params: any) => <TextField {...params} />}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                defaultValue={dayjs().add(6, 'month').toDate()}
                render={({ field }) => (
                  <DesktopDatePicker
                    {...field}
                    label="End Date"
                    format="YYYY-MM-DD"
                    className="col-span-6 md:col-span-4"
                    value={dayjs(field.value)}
                    defaultValue={dayjs().add(6, 'month')}
                    onChange={(date) => handleDateChange(date, field)}
                    // renderInput={(params: any) => <TextField {...params} />}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                className="btn-black-fill btn-icon col-span-12 md:col-span-4"
              >
                <SearchIcon />
                Search Appointments
              </Button>
            </form>
          </LocalizationProvider>
        </div>
      </div>
      <Divider className="mt-4" />
      <div className="grid grid-cols-12">
        <div className="col-span-12 overflow-x-scroll md:overflow-x-auto">
          <table className="orders-table w-full">
            <thead>
              <tr>
                <th className="font-bold">Name</th>
                <th className="font-bold">Email</th>
                <th className="font-bold">Service</th>
                <th className="font-bold">Phone</th>
                <th className="font-bold">Time</th>
                <th className="font-bold">Status</th>
                <th className="font-bold">{}</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((x) => (
                <tr key={x.id}>
                  <td className="font-bold capitalize text-primary">
                    {x.name}
                  </td>
                  <td>{x.email}</td>
                  <td>{x.service}</td>
                  <td>{x.phone}</td>
                  <td className="font-bold">
                    {dayjs(x.appointmentTime).format('MMM D, YYYY hh:mm A')}
                  </td>
                  <td>{x.status}</td>
                  <td>
                    {!x.status.toLowerCase().includes('reschedule') && (
                      <IconButton
                        aria-label="Reschedule"
                        title="Reschedule"
                        onClick={() =>
                          navigate(`/dashboard/reschedule-appointment/${x.id}`)
                        }
                      >
                        <BorderColorIcon />
                      </IconButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments?.length < 1 ? (
            <CustomText noRoundedBorders text="No Records Found" />
          ) : null}
          <div className="mt-3 flex w-[100%] justify-center py-3">
            <TablePagination
              component="div"
              count={parseInt(total.toString(), 10)}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(StoreAppointmentsList);
