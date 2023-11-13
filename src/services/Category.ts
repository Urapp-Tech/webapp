import axios from 'axios';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';

const categoryList = () => {
  return axios.get(API_PATHS.categoryList, getHeaders());
};

const subCategory = (menuId: string) => {
  return axios.get(API_PATHS.subCategory(menuId), getHeaders());
};

const faqService = (menuId: string, submenuId: string) => {
  return axios.get(API_PATHS.faqService(menuId, submenuId), getHeaders());
};

export default {
  categoryList,
  subCategory,
  faqService,
};
