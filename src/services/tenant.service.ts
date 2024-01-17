import { DeviceRegistration } from '../types/device.types';
import {
  GetTenantConfigResponse,
  GetTenantDetailsResponse,
} from '../types/tenant.types';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
import network from './network';

const getTenantWithController = () => {
  let getTenantController = new AbortController();
  return () => {
    getTenantController.abort();
    getTenantController = new AbortController();
    return network.get<GetTenantDetailsResponse>(API_PATHS.getTenant, {
      signal: getTenantController.signal,
      headers: getHeaders(),
    });
  };
};

const getTenantConfigWithController = () => {
  let getTenantConfigController = new AbortController();
  return () => {
    getTenantConfigController.abort();
    getTenantConfigController = new AbortController();
    return network.get<GetTenantConfigResponse>(API_PATHS.getTenantConfig, {
      signal: getTenantConfigController.signal,
      headers: getHeaders(),
    });
  };
};

const deviceRegistrationWithController = () => {
  let deviceRegistrationController = new AbortController();
  return (deviceData: DeviceRegistration) => {
    deviceRegistrationController.abort();
    deviceRegistrationController = new AbortController();
    return network.post(API_PATHS.deviceRegistration, deviceData, {
      signal: deviceRegistrationController.signal,
      headers: getHeaders(),
    });
  };
};

export default {
  getTenant: getTenantWithController(),
  deviceRegistration: deviceRegistrationWithController(),
  getTenantConfig: getTenantConfigWithController(),
};
