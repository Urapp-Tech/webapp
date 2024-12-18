import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
// eslint-disable-next-line import/no-cycle
import network from './network';

const getCategories = (
  tenant: string | any,
  query = { page: 0, size: 2000 }
) => {
  return network.get(API_PATHS.getStoreCategories(tenant), {
    headers: getHeaders(),
    params: query,
  });
};

const getCategoriesItem = (
  tenant: string | any,
  branch: string | any,
  query = {}
) => {
  return network.get(API_PATHS.getStoreCategoriesItems(tenant, branch), {
    headers: getHeaders(),
    params: query,
  });
};

export default {
  getCategories,
  getCategoriesItem,
};
