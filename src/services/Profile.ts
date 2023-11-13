import axios from 'axios';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';

const profileService = () => {
  return axios.get(API_PATHS.profileService, getHeaders());
};

export default {
  profileService,
};
