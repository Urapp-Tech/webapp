import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
import network from './network';

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
  products: Array<ProductPayload>;
}

const anonymousCartWithController = () => {
  let anonymousCartController = new AbortController();
  return (data: AnonymousCartPayload) => {
    anonymousCartController.abort();
    anonymousCartController = new AbortController();
    return network.post(API_PATHS.anonymousCart, data, {
      signal: anonymousCartController.signal,
      headers: getHeaders(),
    });
  };
};

const userCartWithController = () => {
  let userCartController = new AbortController();
  return () => {
    userCartController.abort();
    userCartController = new AbortController();
    return network.post(
      API_PATHS.userCart,
      {},
      {
        signal: userCartController.signal,
        headers: getHeaders(),
      }
    );
  };
};

const updateCartWithController = () => {
  let updateCartController = new AbortController();
  return (data: UpdateCartPayload) => {
    updateCartController.abort();
    updateCartController = new AbortController();
    return network.post(API_PATHS.updateCart, data, {
      signal: updateCartController.signal,
      headers: getHeaders(),
    });
  };
};

export default {
  anonymousCart: anonymousCartWithController(),
  userCart: userCartWithController(),
  updateCart: updateCartWithController(),
};
