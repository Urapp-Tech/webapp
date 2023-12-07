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
  return network.get<GetUserAddressResponse>(
    API_PATHS.getUserAddress,
    getHeaders()
  );
};

const addUserAddress = (data: AddUserAddressPayload) => {
  return network.post<AddUserAddressResponse>(
    API_PATHS.addUserAddress,
    data,
    getHeaders()
  );
};

const updateAddressStatus = (id: string) => {
  return network.put<UpdateAddressStatusResponse>(
    API_PATHS.updateAddressStatus(id),
    {},
    getHeaders()
  );
};
const deleteUserAddress = (id: string) => {
  return network.delete<DeleteUserAddressResponse>(
    API_PATHS.deleteUserAddress(id),
    getHeaders()
  );
};

export default {
  addUserAddress,
  getUserAddress,
  updateAddressStatus,
  deleteUserAddress,
};
