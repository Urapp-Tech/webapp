import { Dayjs } from 'dayjs';

export interface GetProviderListResponse {
  success: boolean;
  code: number;
  message: string;
  data: Provider[];
}

export interface Provider {
  id: string;
  storeEmployee: StoreEmployee;
  storeServiceCategoryItem: string;
  amountType: string;
  amount: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  isDeleted: boolean;
  commissionRate: null;
  branch: string;
  storeEmployeeSchedule: Array<StoreEmployeeSchedule>;
  serviceTime: string;
  rating: number;
}

export interface StoreEmployeeSchedule {
  id: string;
  storeEmployee: string;
  workDay: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  startTime: string;
  endTime: string;
}

export interface StoreEmployee {
  id: string;
  name: string;
  address: string;
  phone: string;
  cnic: string;
  tenant: string;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  email: string;
  avatar: string;
  password: string;
  dob: string;
  note: string;
  payrollType: string;
  salary: number;
  branch: string;
}

export interface GetProviderBookedTimeSlotsResponse {
  success: boolean;
  code: number;
  message: string;
  data: Array<BookedTimeSlot>;
}

export interface BookedTimeSlot {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  note: string;
  tenant: string;
  appointmentNumber: string;
  status: string;
  gstPercentage: number;
  gstAmount: string;
  discountAmount: string;
  totalAmount: string;
  grandTotalAmount: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  storeEmployee: string;
  storeServiceCategoryItem: string;
  appointmentTime: string | Dayjs;
  serviceTime: string;
  storeServiceCategory: string;
  paymentStatus: string;
  code: string;
  appUser: string;
  appointmentType: string;
  guestType: string;
  branch: string;
}
