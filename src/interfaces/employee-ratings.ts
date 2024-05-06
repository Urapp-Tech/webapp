export interface EmployeeRatingData {
  id: string;
  storeEmployee: string;
  storeAppointment: string;
  review: null | any; // You might want to specify the type of review if it's not always null
  star: number;
  status: string;
  isDeleted: boolean;
  tenant: string;
  createdDate: string;
  updatedDate: string;
  appUser: string;
  appointment: {
    id: string;
    name: string;
    phone: string;
    email: string;
    gender: string;
    note: string;
    tenant: string;
    appointmentNumber: number;
    status: string;
    gstPercentage: number;
    gstAmount: number;
    discountAmount: number;
    totalAmount: number;
    grandTotalAmount: number;
    createdBy: string;
    updatedBy: string;
    createdDate: string;
    updatedDate: string;
    storeEmployee: string;
    storeServiceCategoryItem: string;
    appointmentTime: string;
    serviceTime: number;
    storeServiceCategory: string;
    paymentStatus: string;
    code: string;
    appUser: null | any; // You might want to specify the type of appUser if it's not always null
  };
  categoryItem: {
    id: string;
    name: string;
    storeServiceCategory: string;
    isActive: boolean;
    createdBy: string;
    updatedBy: string;
    createdDate: string;
    updatedDate: string;
    description: string;
    avatar: string;
    price: number;
    isDeleted: boolean;
  };
  employee: {
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
  };
}
