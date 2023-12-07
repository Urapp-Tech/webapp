import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
import network from './network';

export interface NewOrder {
  cartId: string;
}

const addOrder = (data: NewOrder) => {
  return network.post(API_PATHS.addOrder, data, getHeaders());
};

const addPayFastOrder = (data: NewOrder) => {
  return network.post(API_PATHS.addPayFastOrder, data, getHeaders());
};

const getPayFastToken = () => {
  return network.post(API_PATHS.getPayFastToken, {}, getHeaders());
};

const orderList = () => {
  return network.get(API_PATHS.orderList, getHeaders());
};

const orderDetail = (id: string) => {
  return network.get(API_PATHS.orderDetail(id), getHeaders());
};

export default {
  addOrder,
  orderList,
  orderDetail,
  getPayFastToken,
  addPayFastOrder,
};
