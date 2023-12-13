import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
import network from './network';

const getUserProfile = () => {
  return network.get(API_PATHS.getUserProfile, getHeaders());
};

export default {
  getUserProfile,
};
