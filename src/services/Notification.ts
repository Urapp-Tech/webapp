import axios from 'axios';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';

const notificationListService = () => {
  return axios.get(API_PATHS.notificationListService, getHeaders());
};

export default {
  notificationListService,
};
