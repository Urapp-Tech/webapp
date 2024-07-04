import { SignUpPayload } from '../types/auth.types';
import { setItem } from './local-storage';

export const HOST = 'https://dev.urapptech.com';
export const BASE_URL = import.meta.env.VITE_BASE_URL || `${HOST}/api/v1/app/`;
export const BASE_SYSTEM_URL =
  import.meta.env.VITE_SYSTEM_BASE_URL || `${HOST}/api/v1/system/config/`;
export const CURRENCY_PREFIX = import.meta.env.VITE_CURRENCY_SYMBOL || `PKR`;
export const APP_USER_PREFIXES = 'app-user';

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

export const ORDER_STATUS = {
  NEW: 'New',
  // DRIVER_ASSIGNED_FOR_ITEM_PICKUP: 'Driver-Assigned-For-Item-Pickup',
  // DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER:
  //   'Driver-Accepted-To-Pick-Up-Item-From-Customer',
  // DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER: 'Driver-Picked-Up-Item-From-Customer',
  // DRIVER_DELIVERED_ITEM_TO_SHOP: 'Driver-Delivered-Item-To-Shop',
  // DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_CUSTOMER:
  //   'Driver-Declined-To-Pickup-Item-From-Customer',
  // DRIVER_RETURNED_ITEM_TO_CUSTOMER: 'Driver-Returned-Item-To-Customer',
  PROCESSING_ITEM: 'Processing-Item',
  // DRIVER_ASSIGNED_FOR_ITEM_DELIVERY: 'Driver-Assigned-For-Item-Delivery',
  // DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP:
  //   'Driver-Accepted-To-Pick-Up-Item-From-Shop',
  // DRIVER_PICKED_UP_ITEM_FROM_SHOP: 'Driver-Picked-Up-Item-From-Shop',
  // DRIVER_DELIVERED_ITEM_TO_CUSTOMER: 'Driver-Delivered-Item-To-Customer',
  // DRIVER_DECLINED_TO_PICKUP_ITEM_FROM_SHOP:
  //   'Driver-Declined-To-Pickup-Item-From-Shop',
  // DRIVER_RETURNED_ITEM_TO_SHOP: 'Driver-Returned-Item-To-Shop',
  // CUSTOMER_PICK_UP: 'Customer-Pick-Up',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const;

export const ORDER_STATUSES = new Map([
  [
    ORDER_STATUS.NEW,
    {
      status: ORDER_STATUS.NEW,
      title: 'Placed Order',
      color: 'text-cyan-500',
      text: 'We have received your order',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 10,
    },
  ],
  /*  [
    ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER,
      title: 'Driver On The Way',
      color: 'text-sky-500',
      text: 'Driver coming to pick your items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 20,
    },
  ], */
  /*  [
    ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_CUSTOMER,
      title: 'Driver Delivering To Shop',
      color: 'text-blue-500',
      text: 'driver have received your items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 30,
    },
  ], */
  /* [
    ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_RETURNED_ITEM_TO_CUSTOMER,
      title: 'Driver Returned Items',
      color: 'text-indigo-500',
      text: 'driver has returned items to you',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 40,
    },
  ], */
  [
    ORDER_STATUS.PROCESSING_ITEM,
    {
      status: ORDER_STATUS.PROCESSING_ITEM,
      title: 'Processing Items',
      color: 'text-fuchsia-500',
      text: 'your items are processing',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 60,
    },
  ],
  /*  [
    ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP,
    {
      status: ORDER_STATUS.DRIVER_PICKED_UP_ITEM_FROM_SHOP,
      title: 'Driver On The Way',
      color: 'text-pink-500',
      text: 'Driver is coming to deliver items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 80,
    },
  ], */
  /* [
    ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER,
    {
      status: ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER,
      title: 'Delivered',
      color: 'text-rose-500',
      text: 'driver has delivered items',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 100,
    },
  ], */
  /*  [
    ORDER_STATUS.CUSTOMER_PICK_UP,
    {
      status: ORDER_STATUS.CUSTOMER_PICK_UP,
      title: 'Items Ready',
      color: 'text-green-500',
      text: 'Items are ready for you to pick up',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 80,
    },
  ], */
  [
    ORDER_STATUS.COMPLETED,
    {
      status: ORDER_STATUS.COMPLETED,
      title: 'Order Completed',
      color: 'text-amber-500',
      text: 'order has been completed',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 100,
    },
  ],
  [
    ORDER_STATUS.CANCELLED,
    {
      status: ORDER_STATUS.CANCELLED,
      title: 'Order Canceled',
      color: 'text-red-500',
      text: 'You have canceled the order',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 100,
    },
  ],
]);

/* export const ORDER_STATUSES = [
  {
    status: ORDER_STATUS.NEW,
    title: 'Placed Order',
    color: 'text-blue-500',
    text: 'We have received your order',
    iconText: 'AssignmentTurnedInOutlinedIcon',
  },
  {
    status: ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_CUSTOMER,
    title: 'Order Picked Up',
    color: 'text-purple-500',
    text: 'Your order has been collected',
    iconText: 'FilterNoneOutlinedIcon',
  },
  {
    status: ORDER_STATUS.PROCESSING_ITEM,
    title: 'Order In Progress',
    color: 'text-green-500',
    text: 'Your order is in progress',
    iconText: 'LocationOnOutlinedIcon',
  },
  {
    status: ORDER_STATUS.DRIVER_ACCEPTED_TO_PICK_UP_ITEM_FROM_SHOP,
    title: 'Order Drop Off',
    color: 'text-orange-500',
    text: 'Your order has been dropped',
    iconText: 'DomainVerificationOutlinedIcon',
  },
  {
    status: ORDER_STATUS.DRIVER_DELIVERED_ITEM_TO_CUSTOMER,
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
 */

// patterns
export const PATTERN = {
  CHAR_SPACE_DASH: /^[A-Za-z\s-]+$/, // used for textfield fields
  ADDRESS_ONLY: /^[A-Za-z0-9\s@.,#()-]+$/, // used for textfield address
  ACTION_WITHOUT_SPACE: /^[a-zA-Z0-9/-]+$/,
  PASSWORD: /^[^\s]+$/,
  ALLOW_ALL: /^[\s\S]+$/, // used for allowed all
  // CHAR_NUM_DOT_AT: /^[A-Za-z0-9\s.@]+$/,
  NUM_PLUS_MINUS: /^[+-\d\s]+$/,
  NUM_DASH: /^[0-9-]+$/, // used for num,dash type text
  PHONE: /^[\d()+-]*\d[\d()+-]*$/, // used for phone type text
  CHAR_NUM_DOT_AT: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, // used for email fields
  CHAR_NUM_SPACE_DASH: /^[A-Za-z0-9\s-]+$/, // used for textfield fields
  CHAR_NUM_DASH: /^[A-Za-z0-9-]+$/, // used for only num,chars,dash like; postal code
  ONLY_NUM: /^\d+$/, // used for string type text
  POINT_NUM: /^[+-]?([0-9]*[.])?[0-9]+$/,
  CHAR_NUM_MINUS_AT_SPACE: /^[a-zA-Z0-9@ -]+$/,
  CHAR_NUM_MIN_AT_HASH_COM_DOT_SPA: /^[a-zA-Z0-9@,\-.# ]+$/,
};

export const MAX_LENGTH_EXCEEDED = 'Maximum length exceeded';
export const INVALID_CHAR = 'Invalid characters';
export const PASSWORD_SHOULD_SAME = 'Password must same to the new one.';
export const PH_MINI_LENGTH = 'Minimum length should be 15';

export const GENDER = [
  {
    id: 'Male',
    name: 'Male',
  },
  {
    id: 'Female',
    name: 'Female',
  },
  {
    id: 'Other',
    name: 'Other',
  },
];
