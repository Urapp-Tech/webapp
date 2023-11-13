import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import AlertBox from '../../components/common/SnackBar';
import { useOrderListQuery } from '../../redux/features/orderStateSliceAPI';
import { setItem } from '../../utilities/local-storage';
import TableRow from './TableRow';

function OrdersPage() {
  const [alertMsg, setAlertMsg] = useState<any>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [search, setSearch] = useState('');

  const { isLoading: isOrderListLoading, data: orderListData } =
    useOrderListQuery('');

  useEffect(() => {
    if (isOrderListLoading) {
      return;
    }
    if (orderListData.success) {
      setItem('ORDER_ITEM', orderListData.data);
      return;
    }
    setAlertMsg(orderListData.message);
    setShowAlert(true);
    setAlertSeverity('error');
  }, [isOrderListLoading, orderListData]);

  const searchOrder = orderListData?.orders?.filter(
    (el: any) =>
      el.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      el.status.toLowerCase().includes(search.toLowerCase())
  );
  return isOrderListLoading ? (
    <Loader />
  ) : (
    <>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverity={alertSeverity}
          alertOpen={showAlert}
          setAlertOpen={setShowAlert}
        />
      )}
      <div className="orders-page p-4 sm:p-5 xl:p-7">
        <div className="mb-3 items-center justify-between sm:flex">
          <h4 className="page-heading">Order History</h4>
          <FormControl className="search-orders">
            <Input
              className="field"
              id="search"
              type="text"
              disableUnderline
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              {searchOrder?.map((row: any) => (
                <TableRow
                  key={row.id}
                  id={row.appOrderNumber}
                  type={row.status}
                  date={row.createdDate}
                  progress={row.progress}
                  item={row.items}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
