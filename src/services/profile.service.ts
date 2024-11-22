import { GetUserProfileResponse } from '../interfaces/profile';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';
import network from './network';

export type UpdateUserProfilePayload = {
  email: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  phone: string;
  currentPassword?: string | undefined;
  newPassword?: string | undefined;
  verifyPassword?: string | undefined;
};

const getUserProfileWithController = () => {
  let getUserProfileController = new AbortController();
  return () => {
    getUserProfileController.abort();
    getUserProfileController = new AbortController();
    return network.get<GetUserProfileResponse>(API_PATHS.getUserProfile, {
      signal: getUserProfileController.signal,
      headers: getHeaders(),
    });
  };
};

const updateUserProfileWithController = () => {
  let updateUserProfileController = new AbortController();
  return (data: UpdateUserProfilePayload) => {
    updateUserProfileController.abort();
    updateUserProfileController = new AbortController();
    return network.post(API_PATHS.updateUserProfile, data, {
      signal: updateUserProfileController.signal,
      headers: getHeaders(),
    });
  };
};

export default {
  getUserProfile: getUserProfileWithController(),
  updateUserProfile: updateUserProfileWithController(),
};
