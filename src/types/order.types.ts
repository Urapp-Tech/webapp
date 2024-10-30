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

export type GetOrderReviewItemsResponse = {
  success: boolean;
  code: number;
  message: string;
  data: OrderReviewItemsData;
};

export type OrderReviewItemsData = {
  list: Array<OrderReviewItem>;
  total: number;
};

export type OrderReviewItem = {
  id: string;
  quantity: number;
  createdDate: string;
  updatedDate: string;
  unitPrice: string;
  appOrder: AppOrder;
  itemId: string;
  isRating: boolean;
  homeCatItem: HomeCatItem;
};

export type HomeCatItem = {
  id: string;
  name: string;
  icon: string;
  banner: string;
  desc: string;
  price: number;
  isActive: boolean;
  homeCategory: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  quantity: number;
  isDeleted: boolean;
  loyaltyCoins: number;
  branch: string;
  tenant: string;
};

export type AppOrder = {
  branch: string;
};
