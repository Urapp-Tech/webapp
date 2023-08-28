import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useEffect, useState } from 'react';
import TableRow from './TableRow';
import { setToken } from '../../utilities/constant';
import OrderService from '../../services/Order';
import { getItem, setItem } from '../../utilities/local-storage';
import AlertBox from '../../components/common/SnackBar';

function OrdersPage() {
  const user = getItem('user');
  const [orders, setOrders] = useState<any>([]);
  const [alertMsg, setAlertMsg] = useState<any>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  setToken(user?.token);
  useEffect(() => {
    OrderService.orderList()
      .then((response) => {
        setOrders(response.data.data);
        setItem('OrderItem', response.data.data);
      })
      .catch((error) => {
        setAlertMsg(error.message);
        setShowAlert(true);
        setAlertSeverity('error');
      });
  }, []);

  return (
    <>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverty={alertSeverity}
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
              {orders?.orders?.map((row: any) => (
                <TableRow
                  key={row.id}
                  id={row.id}
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
