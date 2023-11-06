import axios from 'axios';
import { DeviceRegistration } from '../interfaces/device.interface';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';

const getTenantConfig = () => {
  return axios.get(API_PATHS.getTenantConfig, getHeaders());
};
const deviceRegistration = (deviceData: DeviceRegistration) => {
  return axios.post(API_PATHS.deviceRegistration, deviceData, getHeaders());
};

export default {
  getTenantConfig,
  deviceRegistration,
};
