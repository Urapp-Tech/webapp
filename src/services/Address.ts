import axios from 'axios';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';

export interface AddressPayload {
  name: string;
  address: string;
  type: string;
  latitude: number;
  longitude: number;
}

const getUserAddress = () => {
  return axios.get(API_PATHS.getUserAddress, getHeaders());
};

const userAddress = (data: AddressPayload) => {
  return axios.post(API_PATHS.userAddress, data, getHeaders());
};

const updateAddressStatus = (id: string) => {
  return axios.put(API_PATHS.UpdateAddressStatus(id), {}, getHeaders());
};
const deleteUserAddress = (id: string) => {
  return axios.delete(API_PATHS.deleteUserAddress(id), getHeaders());
};

export default {
  userAddress,
  getUserAddress,
  updateAddressStatus,
  deleteUserAddress,
};
