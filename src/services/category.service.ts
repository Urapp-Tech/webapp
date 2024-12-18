import { GetItemFaqsResponse } from '../interfaces/product';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
import network from './network';

const categoryList = () => {
  return network.get(API_PATHS.categoryList(), { headers: getHeaders() });
};

const subCategory = (menuId: string) => {
  return network.get(API_PATHS.subCategory(menuId), { headers: getHeaders() });
};

const faqService = (branch: string, menuId: string, submenuId: string) => {
  return network.get<GetItemFaqsResponse>(
    API_PATHS.faqService(branch, menuId, submenuId),
    {
      headers: getHeaders(),
    }
  );
};

export default {
  categoryList,
  subCategory,
  faqService,
};
