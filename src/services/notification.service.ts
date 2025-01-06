import { GetNotificationListResponse } from '../types/notification.types';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
import network from './network';

const notificationList = () => {
  return network.get<GetNotificationListResponse>(API_PATHS.notificationList, {
    headers: getHeaders(),
  });
};

export default {
  notificationList,
};
