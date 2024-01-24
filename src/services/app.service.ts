import { GetSystemConfigResponse } from '../types/app.types';
import API_PATHS from '../utilities/API-PATHS';
import network from './network';

const getSystemConfigWithController = () => {
  let getSystemConfigController = new AbortController();
  return () => {
    getSystemConfigController.abort();
    getSystemConfigController = new AbortController();
    return network.get<GetSystemConfigResponse>(API_PATHS.getSystemConfig, {
      signal: getSystemConfigController.signal,
    });
  };
};

export default {
  getSystemConfig: getSystemConfigWithController(),
};
