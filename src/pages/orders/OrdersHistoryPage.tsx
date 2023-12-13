import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { AlertColor } from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TablePagination from '@mui/material/TablePagination';
import { debounce } from '@mui/material/utils';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import AlertBox from '../../components/common/SnackBar';
import { useLazyOrderListQuery } from '../../redux/features/orderStateSliceAPI';
import { setItem } from '../../utilities/local-storage';
import TableRow from './TableRow';

function OrdersPage() {
  const [alertMsg, setAlertMsg] = useState<any>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);

  const [trigger, orderList] = useLazyOrderListQuery();

  const {
    isLoading: isOrderListLoading,
    error: orderListError,
    data: orderListData,
  } = orderList;

  useEffect(() => {
    const queryParams = {
      search,
      limit,
      offset,
    };
    trigger(queryParams);
  }, [search, limit, offset]);

  useEffect(() => {
    if (isOrderListLoading) {
      return;
    }
    if (!orderListData) {
      setAlertSeverity('error');
      setAlertMsg(orderListError);
      setShowAlert(true);
      return;
    }
    if (!orderListData.success) {
      setAlertSeverity('error');
      setAlertMsg(orderListData.message);
      setShowAlert(true);
      return;
    }
    setItem('ORDER_ITEM', orderListData.data);
  }, [orderList]);

  if (orderList.status === 'uninitialized') {
    return <div> </div>;
  }

  const onSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPage(0);
    setSearch(event.target.value);
  };

  const searchDelayed = debounce(onSearchChange, 250);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pageNumber: number
  ) => {
    setPage(pageNumber);
    setOffset(() => pageNumber * limit);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPage(0);
    setLimit(Number(event.target.value));
  };

  return isOrderListLoading ? (
    <Loader />
  ) : (
    <>
      <AlertBox
        msg={alertMsg}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />

      <div className="orders-page p-4 sm:p-5 xl:p-7">
        <div className="mb-3 items-center justify-between sm:flex">
          <h4 className="page-heading">Order History</h4>
          <FormControl className="search-orders">
            <Input
              className="field"
              id="search"
              type="text"
              disableUnderline
              defaultValue={search}
              onChange={searchDelayed}
              inputProps={{ placeholder: 'Search' }}
              endAdornment={<SearchOutlinedIcon />}
            />
          </FormControl>
        </div>
        <div className="orders-card">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Items</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderListData?.data &&
                orderListData.data.orders.map((row: any) => (
                  <TableRow
                    key={row.id}
                    id={row.id}
                    appOrderNumber={row.appOrderNumber}
                    type={row.status}
                    date={row.createdDate}
                    progress={row.progress}
                    item={row.items}
                  />
                ))}
            </tbody>
          </table>
          <div>
            {orderListData?.data ? (
              <TablePagination
                component="div"
                count={orderListData.data.totalResults ?? 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={orderListData.data.perPage ?? 0}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
