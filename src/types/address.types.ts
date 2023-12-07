export type AddUserAddressPayload = {
  address: string;
  latitude: number;
  longitude: number;
  name: string;
  type: string;
};

export type AddUserAddressResponse = {
  success: boolean;
  code: number;
  message: string;
  data: AddUserAddressData;
};

export type AddUserAddressData = {
  address: string;
  latitude: number;
  longitude: number;
  name: string;
  type: string;
  appUser: string;
  tenant: string;
  id: string;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
};

export type GetUserAddressResponse = {
  success: boolean;
  code: number;
  message: string;
  data: Array<UserAddressData>;
};

export type UserAddressData = {
  id: string;
  name: string;
  address: string;
  createdDate: string;
  updatedDate: string;
  appUser: string;
  tenant: string;
  latitude: number;
  longitude: number;
  type: string;
  isActive: boolean;
  isDeleted: boolean;
};

export type UpdateAddressStatusResponse = {
  success: boolean;
  code: number;
  message: string;
  data: UpdateAddressStatusData;
};

export type UpdateAddressStatusData = {
  tenant: string;
  id: string;
  isActive: boolean;
};

export type DeleteUserAddressResponse = {
  success: boolean;
  code: number;
  message: string;
  data: DeleteUserAddressData;
};

export type DeleteUserAddressData = {
  tenant: string;
  id: string;
  isDeleted: boolean;
};
