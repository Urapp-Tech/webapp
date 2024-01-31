import { SignUpPayload } from '../types/auth.types';
import { setItem } from './local-storage';

// export const BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL;
export const LIVE_URL = 'https://dev.urapptech.com';
export const TAQI_DEV = 'http://192.168.8.68:3200';
export const BASE_URL = LIVE_URL;

export const APP_USER_PREFIXES = 'app-user';
export const ORDER_STATUS = {
  NEW: 'New',
  PICKED_UP: 'PickedUp',
  PROCESSING: 'Processing',
  IN_DELIVERY: 'In-Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  PENDING: 'Pending',
} as const;

let token = '';
export const setToken = (data: string) => {
  token = data;
};
export const getToken = () => {
  return token;
};

let tenantId = '';
export const setTenantId = (data: string) => {
  tenantId = data;
};
export const getTenantId = () => {
  return tenantId;
};

export function getHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: getToken(),
  } as const;
}

export const setSignUpData = (data: SignUpPayload) => {
  setItem('SIGN_UP_DATA', data);
};

export const ORDER_STATUSES = [
  {
    status: ORDER_STATUS.NEW,
    title: 'Placed Order',
    color: 'text-blue-500',
    text: 'We have received your order',
    iconText: 'AssignmentTurnedInOutlinedIcon',
  },
  {
    status: ORDER_STATUS.PICKED_UP,
    title: 'Order Picked Up',
    color: 'text-purple-500',
    text: 'Your order has been collected',
    iconText: 'FilterNoneOutlinedIcon',
  },
  {
    status: ORDER_STATUS.PROCESSING,
    title: 'Order In Progress',
    color: 'text-green-500',
    text: 'Your order is in progress',
    iconText: 'LocationOnOutlinedIcon',
  },
  {
    status: ORDER_STATUS.IN_DELIVERY,
    title: 'Order Drop Off',
    color: 'text-orange-500',
    text: 'Your order has been dropped',
    iconText: 'DomainVerificationOutlinedIcon',
  },
  {
    status: ORDER_STATUS.DELIVERED,
    title: 'Order Delivered',
    color: 'text-blue-500',
    text: 'Your order has been delivered',
    iconText: 'AccessTimeIcon',
  },
  {
    status: ORDER_STATUS.CANCELLED,
    title: 'Order Cancelled',
    color: 'text-red-500',
    text: 'Your order has been cancelled',
    iconText: 'DomainVerificationOutlinedIcon',
  },
] as const;
