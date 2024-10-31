import { BASE_URL, getTenantId } from './constant';

function getDomainName() {
  const domain = window.location.hostname;
  return domain;
}

const API_PATHS = {
  // Branch

  getBranches: (tenantId: string) =>
    new URL(`branch/list/${tenantId}`, BASE_URL).toString(),

  createToken: new URL(`app-user/create/token`, BASE_URL).toString(),

  // Address
  getUserAddress: new URL(`appUserAddress/list`, BASE_URL).toString(),

  addUserAddress: new URL(`appUserAddress/add`, BASE_URL).toString(),

  updateAddressStatus: (id: string) =>
    new URL(
      `appUserAddress/update/status/${getTenantId()}/${id}`,
      BASE_URL
    ).toString(),

  deleteUserAddress: (id: string) =>
    new URL(
      `appUserAddress/delete/${getTenantId()}/${id}`,
      BASE_URL
    ).toString(),

  // Auth
  signUp: new URL(`app-user/sign-up/app`, BASE_URL).toString(),

  getOTP: () =>
    new URL(`app-user/get-otp/${getTenantId()}`, BASE_URL).toString(),

  loginService: new URL(`app-user/sign-in/app`, BASE_URL).toString(),

  loginWithFacebook: new URL(
    `app-user/sign-inapp/facebook`,
    BASE_URL
  ).toString(),

  forgotPassword: new URL(`app-user/forgotPassword/app`, BASE_URL).toString(),

  resetPassword: new URL(`app-user/resetPassword/app`, BASE_URL).toString(),

  // Cart
  anonymousCart: new URL(`appUserCart/getCart/device`, BASE_URL).toString(),

  userCart: new URL(`appUserCart/getCart/user`, BASE_URL).toString(),

  updateCart: new URL(`appUserCart/updateCart`, BASE_URL).toString(),

  // Category
  categoryList: () =>
    new URL(`homemenu/list/${getTenantId()}`, BASE_URL).toString(),

  subCategory: (menuId: string) =>
    new URL(`homemenu/view/${getTenantId()}/${menuId}`, BASE_URL).toString(),

  faqService: (menuId: string, submenuId: string) =>
    new URL(
      `homemenu/view/submenu/${getTenantId()}/${menuId}/${submenuId}`,
      BASE_URL
    ).toString(),

  // Notification
  notificationList: new URL(`appNotification/list`, BASE_URL).toString(),

  // Order
  addOrder: new URL(`appOrder/newOrder`, BASE_URL).toString(),

  addPayFastOrder: new URL(`appOrder/newPayFastOrder`, BASE_URL).toString(),

  addCashOrder: new URL(`appOrder/newCashOrder`, BASE_URL).toString(),

  updateOrderStatus: new URL(`appOrder/statuses/create`, BASE_URL).toString(),

  getPayFastToken: new URL(
    `appOrder/pay-fast/access-token`,
    BASE_URL
  ).toString(),

  orderList: new URL(`appOrder/webapp/list`, BASE_URL).toString(),

  orderDetail: (id: string) =>
    new URL(`appOrder/webapp/detail/${id}`, BASE_URL).toString(),

  // Profile
  getUserProfile: new URL(`app-user/profile`, BASE_URL).toString(),
  updateUserProfile: new URL(`app-user/update`, BASE_URL).toString(),

  // Tenant
  getTenant: () => new URL(`shop/view/${getTenantId()}`, BASE_URL).toString(),
  getTenantConfig: () =>
    new URL(`config/view/${getTenantId()}`, BASE_URL).toString(),

  deviceRegistration: new URL(
    `app-user-device/register-device`,
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
      `rating/reviews/${homeCatItemId}/${page}/${size}`,
      BASE_URL
    ).toString(),

  ratingReviewStarList: (homeCatItemId: string) =>
    new URL(`rating/reviews/${homeCatItemId}`, BASE_URL).toString(),
  getStoreCategories: (tenant: string) =>
    new URL(`categories/list/${tenant}`, BASE_URL).toString(),
  getStoreCategoriesItems: (tenant: string) =>
    new URL(`categories/items/list/${tenant}`, BASE_URL).toString(),
  // APPOINTMENTS REST API
  getBarbersList: (storeServiceCatItemId: string) =>
    new URL(
      `store/appointment/employee/${storeServiceCatItemId}`,
      BASE_URL
    ).toString(),
  getBarberBookedTimeSlots: (storeEmp: any, date: any) =>
    new URL(
      `store/appointment/linedUp/${storeEmp}/${date}`,
      BASE_URL
    ).toString(),
  appointmentCreate: () =>
    new URL(`store/appointment/create`, BASE_URL).toString(),
  getAllPreviousAppointments: (tenant: string) =>
    new URL(`store/appointment/list/${tenant}`, BASE_URL).toString(),
  findAppointment: (appointment_id: string) =>
    new URL(`store/appointment/get/${appointment_id}`, BASE_URL).toString(),
  rescheduleAppointment: (appointment_id: string) =>
    new URL(`appointment/re-schedule/${appointment_id}`, BASE_URL).toString(),
  getBanners: () => new URL(`banner/list`, BASE_URL).toString(),
  CheckEmployeeAvailable: (employeeId: string, date: string) =>
    new URL(
      `appointment/leave/management/${employeeId}/${date}`,
      BASE_URL
    ).toString(),

  getUserAppointmentsByDate: (date: string) =>
    new URL(`appointment/users/${date}`, BASE_URL).toString(),

  getUserAppointmentsByMultipleDates: () =>
    new URL(`appointment/users/multi-dates`, BASE_URL).toString(),

  getStoreEmployeeRating: () =>
    new URL(`store/appointment-ratings/list`, BASE_URL).toString(),
  updateEmployeeRating: (id: string) =>
    new URL(`store/appointment-ratings/update/${id}`, BASE_URL).toString(),
} as const;

export default API_PATHS;
