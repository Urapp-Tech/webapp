import { GetOrderListData } from '../../types/order.types';
import TableRow from './TableRow';

function OrdersTable({ orderListData }: { orderListData: GetOrderListData }) {
  return (
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
        {orderListData &&
          orderListData.orders.map((row) => (
            <TableRow
              key={row.id}
              id={row.id}
              appOrderNumber={row.appOrderNumber}
              type={row.status}
              date={row.createdDate}
              item={row.items}
            />
          ))}
      </tbody>
    </table>
  );
}

export default OrdersTable;
