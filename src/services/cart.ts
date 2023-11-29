import axios from 'axios';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';

export interface AnonymousCartPayload {
  tenant: string | undefined;
  appUserDevice: string | undefined;
}
export interface ProductPayload {
  id: string;
  quantity: number;
}
export interface UpdateCartPayload {
  cartId: string | null | undefined;
  appUser: string | null | undefined;
  tenant: string | null | undefined;
  appUserDevice: string | null | undefined;
  appUserAddress: string | null | undefined;
  pickupDateTime: string | null | undefined;
  dropDateTime: string | null | undefined;
  promoCode: string | null | undefined;
  products: ProductPayload[];
}

const anonymousCart = (data: AnonymousCartPayload) => {
  return axios.post(API_PATHS.anonymousCart, data, getHeaders());
};

const userCart = () => {
  return axios.post(API_PATHS.userCart, {}, getHeaders());
};

const updateCart = (data: UpdateCartPayload) => {
  return axios.post(API_PATHS.updateCart, data, getHeaders());
};

export default {
  anonymousCart,
  userCart,
  updateCart,
};
