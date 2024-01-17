export type GetOrderListResponse = {
  success: boolean;
  code: number;
  message: string;
  data: GetOrderListData;
};

export type GetOrderListData = {
  orders: Array<Order>;
  page: number;
  perPage: number;
  totalPages: number;
  totalResults: number;
};

export type Order = {
  appOrderNumber: string;
  id: string;
  createdDate: string;
  updatedDate: string;
  appUser: string;
  tenant: string;
  status: string;
  paymentStatus: string;
  pickupDateTime: string;
  dropDateTime: string;
  appUserAddress: string;
  voucherCode?: string;
  gstPercentage: number;
  gstAmount: string;
  totalAmount: string;
  grandTotal: string;
  appUserCart: string;
  orderNumber: string;
  checkoutSessionId?: string;
  paymentType: string;
  items: string;
};
