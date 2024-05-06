/* eslint-disable import/no-cycle */
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';

import network from './network';

const getPendingRatingList = (params?: object) => {
  return network.get(API_PATHS.getStoreEmployeeRating(), {
    headers: getHeaders(),
    params: { status: 'Pending' },
  });
};

const updateRating = (id: string, body?: object) => {
  return network.patch(API_PATHS.updateEmployeeRating(id), body, {
    headers: getHeaders(),
  });
};

export default {
  getPendingRatingList,
  updateRating,
};
