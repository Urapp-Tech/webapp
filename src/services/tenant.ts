import { DeviceRegistration } from '../types/device.types';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
import network from './network';

const getTenantConfig = () => {
  return network.get(API_PATHS.getTenantConfig, getHeaders());
};
const deviceRegistration = (deviceData: DeviceRegistration) => {
  return network.post(API_PATHS.deviceRegistration, deviceData, getHeaders());
};

export default {
  getTenantConfig,
  deviceRegistration,
};
