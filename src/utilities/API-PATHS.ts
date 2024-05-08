import { BASE_URL, getTenantId } from './constant';

function getDomainName() {
  const domain = window.location.hostname;
  return domain.split('.')[0];
}

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
      `/api/v1/app/appUserAddress/update/status/${getTenantId()}/${id}`,
      BASE_URL
    ).toString(),

  deleteUserAddress: (id: string) =>
    new URL(
      `/api/v1/app/appUserAddress/delete/${getTenantId()}/${id}`,
      BASE_URL
    ).toString(),

  // Auth
  signUp: new URL(`/api/v1/app/app-user/sign-up/app`, BASE_URL).toString(),

  getOTP: () =>
    new URL(
      `/api/v1/app/app-user/get-otp/${getTenantId()}`,
      BASE_URL
    ).toString(),

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

  resetPassword: new URL(
    `/api/v1/app/app-user/resetPassword/app`,
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
  categoryList: () =>
    new URL(`/api/v1/app/homemenu/list/${getTenantId()}`, BASE_URL).toString(),

  subCategory: (menuId: string) =>
    new URL(
      `/api/v1/app/homemenu/view/${getTenantId()}/${menuId}`,
      BASE_URL
    ).toString(),

  faqService: (menuId: string, submenuId: string) =>
    new URL(
      `/api/v1/app/homemenu/view/submenu/${getTenantId()}/${menuId}/${submenuId}`,
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
  getTenant: () =>
    new URL(`/api/v1/app/shop/view/${getTenantId()}`, BASE_URL).toString(),
  getTenantConfig: () =>
    new URL(`/api/v1/app/config/view/${getTenantId()}`, BASE_URL).toString(),

  deviceRegistration: new URL(
    `/api/v1/app/app-user-device/register-device`,
    BASE_URL
  ).toString(),

  // System Config
  getSystemConfig: () =>
    new URL(
      `/api/v1/system/config/get/theme/${getDomainName()}`,
      BASE_URL
    ).toString(),

  ratingReviews: (homeCatItemId: string, page: string, size: string) =>
    new URL(
      `/api/v1/app/rating/reviews/${homeCatItemId}/${page}/${size}`,
      BASE_URL
    ).toString(),

  ratingReviewStarList: (homeCatItemId: string) =>
    new URL(`/api/v1/app/rating/reviews/${homeCatItemId}`, BASE_URL).toString(),
  getStoreCategories: (tenant: string) =>
    new URL(`/api/v1/app/categories/list/${tenant}`, BASE_URL).toString(),
  getStoreCategoriesItems: (tenant: string) =>
    new URL(`/api/v1/app/categories/items/list/${tenant}`, BASE_URL).toString(),
  // APPOINTMENTS REST API
  getBarbersList: (storeServiceCatItemId: string) =>
    new URL(
      `/api/v1/app/store/appointment/employee/${storeServiceCatItemId}`,
      BASE_URL
    ).toString(),
  getBarberBookedTimeSlots: (storeEmp: any, date: any) =>
    new URL(
      `/api/v1/app/store/appointment/linedUp/${storeEmp}/${date}`,
      BASE_URL
    ).toString(),
  appointmentCreate: () =>
    new URL(`/api/v1/app/store/appointment/create`, BASE_URL).toString(),
  getAllPreviousAppointments: (tenant: string) =>
    new URL(
      `/api/v1/app/store/appointment/list/${tenant}`,
      BASE_URL
    ).toString(),
  findAppointment: (appointment_id: string) =>
    new URL(
      `/api/v1/app/store/appointment/get/${appointment_id}`,
      BASE_URL
    ).toString(),
  rescheduleAppointment: (appointment_id: string) =>
    new URL(
      `/api/v1/app/store/appointment/re-schedule/${appointment_id}`,
      BASE_URL
    ).toString(),
  getBanners: () => new URL(`/api/v1/app/banner/list`, BASE_URL).toString(),
  CheckEmployeeAvailable: (employeeId: string, date: string) =>
    new URL(
      `/api/v1/app/appointment/leave/management/${employeeId}/${date}`,
      BASE_URL
    ).toString(),
  getStoreEmployeeRating: () =>
    new URL(`/api/v1/app/store/appointment-ratings/list`, BASE_URL).toString(),
  updateEmployeeRating: (id: string) =>
    new URL(
      `/api/v1/app/store/appointment-ratings/update/${id}`,
      BASE_URL
    ).toString(),
} as const;

export default API_PATHS;
