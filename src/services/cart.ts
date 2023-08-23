import devNetwork from '../utilities/devNetwork';

export interface AnonyomousCartPayload {
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
const AnonyomousCart = (data: AnonyomousCartPayload) => {
  return devNetwork.post(`appUserCart/getCart/device`, data);
};
const updateCart = (data: UpdateCartPayload) => {
  return devNetwork.post(`appUserCart/updateCart`, data);
};
export default {
  AnonyomousCart,
  updateCart,
};
