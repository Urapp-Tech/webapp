export interface AppointmentProvider {
  name: string;
  address: string;
  phone: string;
  cnic: string;
  password: string;
  dob: string;
  note: string;
  startDateTime: string;
  endDateTime: string;
  isActive: boolean;
  isDeleted: boolean;
  email: string;
  uploadImg: any;
  services: any;
  categoryId: any;
  servicesId: any;
  servicesAmount: any;
  price: any;
  mints: any;
  payrollType: any;
}

export interface AppointmentService {
  serviceName: string;
  providerName: string;
  serviceDesc: string;
  fees: string;
}

export interface AppointmentProviderSchedule {
  weekName: any;
  startDateTime: string;
  endDateTime: string;
}

export interface AppointmentProviderScheduleTime {
  startTime: string;
  endTime: string;
}

export interface AppointmentVisit {
  appointmentType?: any;
  isCheckTimingSlot: boolean;
  isUrgent: boolean;
  visitName: string;
  phone: string;
  appointmentTime: string;
  appointmentDate: string;
  note: string;
  appointmentProvider: string;
  appointmentService: any;
}

export interface AddAppointmentForm {
  name: string;
  email: string;
  phone: string;
  note: string;
  gender: string;
  appointmentDate: any;
  categoryId: any;
  storeEmployee: any;
  storeServiceCategoryItem: any;
}
export interface UpdateAppointmentForm {
  name: string;
  email: string;
  phone: string;
  note: string;
  gender: string;
}

export interface Appointment {
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
  appointmentTime: string;
  serviceTime: string;
  storeServiceCategory: string;
  paymentStatus: string;
  code: string;
  appUser: string;
  appointmentType: string;
  guestType: string;
  branch: string;
  appointmentDiscount: string;
  isManuel: boolean;
  appointmentDiscountAmountType: string;
  service: string;
  storeEmployeeName: string;
}
