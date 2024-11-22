import { GetOrderDetailsResponse } from '../types/order.types';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
import network from './network';

export interface NewOrder {
  cartId: string;
  branch: string;
}

export interface OrderStatus {
  app_order: string;
  status: string;
}

const addOrder = (data: NewOrder) => {
  return network.post(API_PATHS.addOrder, data, { headers: getHeaders() });
};

const addPayFastOrder = (data: NewOrder) => {
  return network.post(API_PATHS.addPayFastOrder, data, {
    headers: getHeaders(),
  });
};

const addCashOrder = (data: NewOrder) => {
  return network.post(API_PATHS.addCashOrder, data, { headers: getHeaders() });
};

const updateOrderStatus = (data: OrderStatus) => {
  return network.post(API_PATHS.updateOrderStatus, data, {
    headers: getHeaders(),
  });
};

const getPayFastToken = () => {
  return network.post(API_PATHS.getPayFastToken, {}, { headers: getHeaders() });
};

const orderList = () => {
  return network.get(API_PATHS.orderList, { headers: getHeaders() });
};

const orderDetail = (id: string) => {
  return network.get<GetOrderDetailsResponse>(API_PATHS.orderDetail(id), {
    headers: getHeaders(),
  });
};

export default {
  addOrder,
  orderList,
  orderDetail,
  getPayFastToken,
  addPayFastOrder,
  addCashOrder,
  updateOrderStatus,
};
