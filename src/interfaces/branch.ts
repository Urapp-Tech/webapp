export type GetBranchesResponse = {
  success: boolean;
  code: number;
  message: string;
  data: BranchData;
};

export type BranchData = {
  list: Array<Branch>;
  total: number;
};

export type Branch = {
  id: string;
  tenant: string;
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
  backofficeUser: null | string;
  createdBy: null | string;
  updatedBy: string;
  description: string;
  mobile: null | string;
  landline: null | string;
  address: string;
  latitude: string;
  longitude: string;
  attendanceDistance: number;
  officeTimeIn: null | string;
  officeTimeOut: null | string;
};
