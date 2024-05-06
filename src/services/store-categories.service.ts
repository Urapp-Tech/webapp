import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
// eslint-disable-next-line import/no-cycle
import network from './network';

const getCategories = (tenant: string | any) => {
  return network.get(API_PATHS.getStoreCategories(tenant), {
    headers: getHeaders(),
  });
};

const getCategoriesItem = (tenant: string | any, query = {}) => {
  return network.get(API_PATHS.getStoreCategoriesItems(tenant), {
    headers: getHeaders(),
    params: query,
  });
};

export default {
  getCategories,
  getCategoriesItem,
};
