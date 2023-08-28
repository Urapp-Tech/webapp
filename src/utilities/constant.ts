import { SignupPayload } from '../interfaces/auth.interface';
import { setItem } from './local-storage';

export const BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL;
export const DEV_URL = 'https://dev.urapptech.com/api/v1/app/';
// export const BASE_URL = 'https://dev.urapptech.com/api/v1/app/'
export const APP_USER_PREFIXES = 'app-user';
export const tenantId = '619943ef-8e9f-4a74-9e1e-4b299d19330d';
export const ORDER_STATUS_NEW = 'New';
export const ORDER_STATUS_PICKED_UP = 'PickedUp';
export const ORDER_STATUS_PROCESSING = 'Processing';
export const ORDER_STATUS_IN_DELIVERY = 'In-Delivery';
export const ORDER_STATUS_IN_DELIVERED = 'Delivered';
export const ORDER_STATUS_IN_CANCELLED = 'Cancelled';
export const ORDER_STATUS_PENDING = 'Pending';

let token = '';

export const setToken = (data: string) => {
  token = data;
};

export const getToken = () => {
  return token;
};
export const setSignUpData = (data: SignupPayload) => {
  setItem('SignupData', data);
};

export const ORDER_STATUSES = [
  {
    status: ORDER_STATUS_NEW,
    title: 'Placed Order',
    color: 'text-blue-500',
    text: 'We have received your order',
    iconText: 'AssignmentTurnedInOutlinedIcon',
  },
  {
    status: ORDER_STATUS_PICKED_UP,
    title: 'Order Picked Up',
    color: 'text-purple-500',
    text: 'Your order has been collected',
    iconText: 'FilterNoneOutlinedIcon',
  },
  {
    status: ORDER_STATUS_PROCESSING,
    title: 'Order In Progress',
    color: 'text-green-500',
    text: 'Your order is in progress',
    iconText: 'LocationOnOutlinedIcon',
  },
  {
    status: ORDER_STATUS_IN_DELIVERY,
    title: 'Order Drop Off',
    color: 'text-orange-500',
    text: 'Your order has been dropped',
    iconText: 'DomainVerificationOutlinedIcon',
  },
  {
    status: ORDER_STATUS_IN_DELIVERED,
    title: 'Order Delivered',
    color: 'text-blue-500',
    text: 'Your order has been delivered',
    iconText: 'AccessTimeIcon',
  },
  {
    status: ORDER_STATUS_IN_CANCELLED,
    title: 'Order Cancelled',
    color: 'text-red-500',
    text: 'Your order has been cancelled',
    iconText: 'DomainVerificationOutlinedIcon',
  },
];
