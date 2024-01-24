import { BASE_URL, tenantId } from './constant';

const API_PATHS = {
  // Address
  getUserAddress: new URL(
    `/api/v1/app/appUserAddress/list`,
    BASE_URL
  ).toString(),

  addUserAddress: new URL(
    `/api/v1/app/appUserAddress/add`,
    BASE_URL
  ).toString(),

  updateAddressStatus: (id: string) =>
    new URL(
      `/api/v1/app/appUserAddress/update/status/${tenantId}/${id}`,
      BASE_URL
    ).toString(),

  deleteUserAddress: (id: string) =>
    new URL(
      `/api/v1/app/appUserAddress/delete/${tenantId}/${id}`,
      BASE_URL
    ).toString(),

  // Auth
  signUp: new URL(`/api/v1/app/app-user/sign-up/app`, BASE_URL).toString(),

  getOTP: new URL(`/api/v1/app/app-user/get-otp`, BASE_URL).toString(),

  loginService: new URL(
    `/api/v1/app/app-user/sign-in/app`,
    BASE_URL
  ).toString(),

  loginWithFacebook: new URL(
    `/api/v1/app/app-user/sign-inapp/facebook`,
    BASE_URL
  ).toString(),

  forgotPassword: new URL(
    `/api/v1/app/app-user/forgotPassword/app`,
    BASE_URL
  ).toString(),

  // Cart
  anonymousCart: new URL(
    `/api/v1/app/appUserCart/getCart/device`,
    BASE_URL
  ).toString(),

  userCart: new URL(
    `/api/v1/app/appUserCart/getCart/user`,
    BASE_URL
  ).toString(),

  updateCart: new URL(
    `/api/v1/app/appUserCart/updateCart`,
    BASE_URL
  ).toString(),

  // Category
  categoryList: new URL(
    `/api/v1/app/homemenu/list/${tenantId}`,
    BASE_URL
  ).toString(),

  subCategory: (menuId: string) =>
    new URL(
      `/api/v1/app/homemenu/view/${tenantId}/${menuId}`,
      BASE_URL
    ).toString(),

  faqService: (menuId: string, submenuId: string) =>
    new URL(
      `/api/v1/app/homemenu/view/submenu/${tenantId}/${menuId}/${submenuId}`,
      BASE_URL
    ).toString(),

  // Notification
  notificationList: new URL(
    `/api/v1/app/appNotification/list`,
    BASE_URL
  ).toString(),

  // Order
  addOrder: new URL(`/api/v1/app/appOrder/newOrder`, BASE_URL).toString(),

  addPayFastOrder: new URL(
    `/api/v1/app/appOrder/newPayFastOrder`,
    BASE_URL
  ).toString(),

  addCashOrder: new URL(
    `/api/v1/app/appOrder/newCashOrder`,
    BASE_URL
  ).toString(),

  getPayFastToken: new URL(
    `/api/v1/app/appOrder/pay-fast/access-token`,
    BASE_URL
  ).toString(),

  orderList: new URL(`/api/v1/app/appOrder/webapp/list`, BASE_URL).toString(),

  orderDetail: (id: string) =>
    new URL(`/api/v1/app/appOrder/webapp/detail/${id}`, BASE_URL).toString(),

  // Profile
  getUserProfile: new URL(`/api/v1/app/app-user/profile`, BASE_URL).toString(),
  updateUserProfile: new URL(
    `/api/v1/app/app-user/update`,
    BASE_URL
  ).toString(),

  // Tenant
  getTenant: new URL(`/api/v1/app/shop/view/${tenantId}`, BASE_URL).toString(),
  getTenantConfig: new URL(
    `/api/v1/app/config/view/${tenantId}`,
    BASE_URL
  ).toString(),

  deviceRegistration: new URL(
    `/api/v1/app/app-user-device/register-device`,
    BASE_URL
  ).toString(),

  // System COnfig
  getSystemConfig: new URL(
    `/api/v1/system/config/get/${tenantId}`,
    BASE_URL
  ).toString(),
} as const;

export default API_PATHS;
