/* eslint-disable import/no-cycle */
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';

import network from './network';

const getBannerList = (params?: object) => {
  return network.get(API_PATHS.getBanners(), {
    headers: getHeaders(),
    params,
  });
};

export default {
  getBannerList,
};
