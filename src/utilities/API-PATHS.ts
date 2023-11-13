import { BASE_URL, tenantId } from './constant';

const API_PATHS = {
  // Address
  getUserAddress: new URL(`appUserAddress/list`, BASE_URL).toString(),

  userAddress: new URL(`appUserAddress/add`, BASE_URL).toString(),

  UpdateAddressStatus: (id: string) =>
    new URL(
      `appUserAddress/update/status/${tenantId}/${id}`,
      BASE_URL
    ).toString(),

  deleteUserAddress: (id: string) =>
    new URL(`appUserAddress/delete/${tenantId}/${id}`, BASE_URL).toString(),

  // Auth
  signupService: new URL(`app-user/sign-up/app`, BASE_URL).toString(),

  otpService: new URL(`app-user/get-otp`, BASE_URL).toString(),

  loginService: new URL(`app-user/sign-in/app`, BASE_URL).toString(),

  // Cart
  anonymousCart: new URL(`appUserCart/getCart/device`, BASE_URL).toString(),

  updateCart: new URL(`appUserCart/updateCart`, BASE_URL).toString(),

  // Category
  categoryList: new URL(`homemenu/list/${tenantId}`, BASE_URL).toString(),

  subCategory: (menuId: string) =>
    new URL(`homemenu/view/${tenantId}/${menuId}`, BASE_URL).toString(),

  faqService: (menuId: string, submenuId: string) =>
    new URL(
      `homemenu/view/submenu/${tenantId}/${menuId}/${submenuId}`,
      BASE_URL
    ).toString(),

  // Notification
  notificationListService: new URL(`appNotification/list`, BASE_URL).toString(),

  // Order
  addOrder: new URL(`appOrder/newOrder`, BASE_URL).toString(),

  orderList: new URL(`appOrder/webapp/list`, BASE_URL).toString(),

  orderDetail: (id: string) =>
    new URL(`appOrder/webapp/detail/${id}`, BASE_URL).toString(),

  // Profile
  profileService: new URL(`app-user/profile`, BASE_URL).toString(),

  // Tenant
  getTenantConfig: new URL(`shop/view/${tenantId}`, BASE_URL).toString(),

  deviceRegistration: new URL(
    `app-user-device/register-device`,
    BASE_URL
  ).toString(),
} as const;

export default API_PATHS;
