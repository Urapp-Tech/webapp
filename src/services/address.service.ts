import {
  AddUserAddressPayload,
  AddUserAddressResponse,
  DeleteUserAddressResponse,
  GetUserAddressResponse,
  UpdateAddressStatusResponse,
} from '../types/address.types';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
import network from './network';

const getUserAddress = () => {
  return network.get<GetUserAddressResponse>(API_PATHS.getUserAddress, {
    headers: getHeaders(),
  });
};

const addUserAddress = (data: AddUserAddressPayload) => {
  return network.post<AddUserAddressResponse>(API_PATHS.addUserAddress, data, {
    headers: getHeaders(),
  });
};

const updateAddressStatus = (id: string) => {
  return network.put<UpdateAddressStatusResponse>(
    API_PATHS.updateAddressStatus(id),
    {},
    { headers: getHeaders() }
  );
};
const deleteUserAddress = (id: string) => {
  return network.delete<DeleteUserAddressResponse>(
    API_PATHS.deleteUserAddress(id),
    { headers: getHeaders() }
  );
};

export default {
  addUserAddress,
  getUserAddress,
  updateAddressStatus,
  deleteUserAddress,
};
