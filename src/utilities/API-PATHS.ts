import { BASE_URL, getTenantId } from './constant';

function getDomainName() {
  const domain = window.location.hostname;
  return domain;
}

const API_PATHS = {
  // Branch

  getBranches: (tenantId: string) => {
    const url = new URL(`branch/list/${tenantId}`, BASE_URL);

    return url.toString();
  },

  createToken: () => {
    const url = new URL(`app-user/create/token`, BASE_URL);
    return url.toString();
  },

  // Address
  getUserAddress: () => {
    const url = new URL(`appUserAddress/list`, BASE_URL);
    return url.toString();
  },

  addUserAddress: () => {
    const url = new URL(`appUserAddress/add`, BASE_URL);
    return url.toString();
  },

  updateAddressStatus: (id: string) => {
    const url = new URL(
      `appUserAddress/update/status/${getTenantId()}/${id}`,
      BASE_URL
    );
    return url.toString();
  },

  deleteUserAddress: (id: string) => {
    const url = new URL(
      `appUserAddress/delete/${getTenantId()}/${id}`,
      BASE_URL
    );
    return url.toString();
  },

  // Auth
  signUp: () => {
    const url = new URL(`app-user/sign-up/app`, BASE_URL);
    return url.toString();
  },

  getOTP: () => {
    const url = new URL(`app-user/get-otp/${getTenantId()}`, BASE_URL);
    return url.toString();
  },

  loginService: () => {
    const url = new URL(`app-user/sign-in/app`, BASE_URL);
    return url.toString();
  },

  loginWithFacebook: () => {
    const url = new URL(`app-user/sign-inapp/facebook`, BASE_URL);
    return url.toString();
  },

  forgotPassword: () => {
    const url = new URL(`app-user/forgotPassword/app`, BASE_URL);
    return url.toString();
  },

  resetPassword: () => {
    const url = new URL(`app-user/resetPassword/app`, BASE_URL);
    return url.toString();
  },

  // Cart
  anonymousCart: () => {
    const url = new URL(`appUserCart/getCart/device`, BASE_URL);
    return url.toString();
  },

  userCart: () => {
    const url = new URL(`appUserCart/getCart/user`, BASE_URL);
    return url.toString();
  },

  updateCart: () => {
    const url = new URL(`appUserCart/updateCart`, BASE_URL);
    return url.toString();
  },

  // Category
  categoryList: () => {
    const url = new URL(`homemenu/list/${getTenantId()}`, BASE_URL);
    return url.toString();
  },

  subCategory: (menuId: string) => {
    const url = new URL(`homemenu/view/${getTenantId()}/${menuId}`, BASE_URL);
    return url.toString();
  },

  faqService: (branch: string, menuId: string, submenuId: string) => {
    const url = new URL(
      `homemenu/view/submenu/${getTenantId()}/${branch}/${menuId}/${submenuId}`,
      BASE_URL
    );
    return url.toString();
  },

  // Notification
  notificationList: () => {
    const url = new URL(`notifications/list`, BASE_URL);
    return url.toString();
  },

  // Order
  addOrder: () => {
    const url = new URL(`appOrder/newOrder`, BASE_URL);
    return url.toString();
  },

  addPayFastOrder: () => {
    const url = new URL(`appOrder/newPayFastOrder`, BASE_URL);
    return url.toString();
  },

  addCashOrder: () => {
    const url = new URL(`appOrder/newCashOrder`, BASE_URL);
    return url.toString();
  },

  updateOrderStatus: () => {
    const url = new URL(`appOrder/statuses/create`, BASE_URL);
    return url.toString();
  },

  getPayFastToken: () => {
    const url = new URL(`appOrder/pay-fast/access-token`, BASE_URL);
    return url.toString();
  },

  orderList: () => {
    const url = new URL(`appOrder/webapp/list`, BASE_URL);
    return url.toString();
  },

  orderDetail: (id: string) => {
    const url = new URL(`appOrder/webapp/detail/${id}`, BASE_URL);
    return url.toString();
  },

  // Profile
  getUserProfile: () => {
    const url = new URL(`app-user/profile`, BASE_URL);
    return url.toString();
  },

  updateUserProfile: () => {
    const url = new URL(`app-user/update`, BASE_URL);
    return url.toString();
  },

  // Tenant
  getTenant: () => {
    const url = new URL(`shop/view/${getTenantId()}`, BASE_URL);
    return url.toString();
  },

  getTenantConfig: () => {
    const url = new URL(`config/view/${getTenantId()}`, BASE_URL);
    return url.toString();
  },

  deviceRegistration: () => {
    const url = new URL(`app-user-device/register-device`, BASE_URL);
    return url.toString();
  },

  // System Config
  getSystemConfig: () => {
    const url = new URL(
      `/api/v1/system/config/get/theme/${getDomainName()}`,
      BASE_URL
    );
    return url.toString();
  },

  ratingReviews: (homeCatItemId: string, page: string, size: string) => {
    const url = new URL(
      `rating/reviews/${homeCatItemId}/${page}/${size}`,
      BASE_URL
    );
    return url.toString();
  },

  ratingReviewStarList: (homeCatItemId: string) => {
    const url = new URL(`rating/reviews/${homeCatItemId}`, BASE_URL);
    return url.toString();
  },

  getStoreCategories: (tenant: string) => {
    const url = new URL(`categories/list/${tenant}`, BASE_URL);
    return url.toString();
  },

  getStoreCategoriesItems: (tenant: string, branch: string) => {
    const url = new URL(`categories/items/list/${tenant}/${branch}`, BASE_URL);
    return url.toString();
  },

  // APPOINTMENTS REST API
  getBarbersList: (storeServiceCatItemId: string) => {
    const url = new URL(
      `store/appointment/employee/${storeServiceCatItemId}`,
      BASE_URL
    );
    return url.toString();
  },

  getBarberBookedTimeSlots: (storeEmp: string, date: string) => {
    const url = new URL(
      `store/appointment/linedUp/${storeEmp}/${date}`,
      BASE_URL
    );
    return url.toString();
  },

  appointmentCreate: () => {
    const url = new URL(`store/appointment/create`, BASE_URL);
    return url.toString();
  },

  getAllPreviousAppointments: (tenant: string) => {
    const url = new URL(`store/appointment/list/${tenant}`, BASE_URL);
    return url.toString();
  },

  findAppointment: (appointment_id: string) => {
    const url = new URL(`store/appointment/get/${appointment_id}`, BASE_URL);
    return url.toString();
  },

  rescheduleAppointment: (appointment_id: string) => {
    const url = new URL(`appointment/re-schedule/${appointment_id}`, BASE_URL);
    return url.toString();
  },

  getBanners: () => {
    const url = new URL(`banner/list`, BASE_URL);
    return url.toString();
  },

  CheckEmployeeAvailable: (employeeId: string, date: string) => {
    const url = new URL(
      `appointment/leave/management/${employeeId}/${date}`,
      BASE_URL
    );
    return url.toString();
  },

  getUserAppointmentsByDate: (date: string) => {
    const url = new URL(`appointment/users/${date}`, BASE_URL);
    return url.toString();
  },

  getUserAppointmentsByMultipleDates: () => {
    const url = new URL(`appointment/users/multi-dates`, BASE_URL);
    return url.toString();
  },

  getStoreEmployeeRating: () => {
    const url = new URL(`store/appointment-ratings/list`, BASE_URL);
    return url.toString();
  },

  updateEmployeeRating: (id: string) => {
    const url = new URL(`store/appointment-ratings/update/${id}`, BASE_URL);
    return url.toString();
  },

  getVouchers: () => {
    const url = new URL(`/api/v1/app/vouchers/promotion/list`, BASE_URL);
    return url.toString();
  },
} as const;

export default API_PATHS;
