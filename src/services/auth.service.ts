import {
  ForgotPasswordPayload,
  LoginPayload,
  OTPPayload,
  SignUpPayload,
} from '../types/auth.types';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders, tenantId } from '../utilities/constant';
import network from './network';

const signUp = (signupData: SignUpPayload) => {
  return network.post(API_PATHS.signUp, signupData, getHeaders());
};

const getOTP = (data: OTPPayload) => {
  return network.post(API_PATHS.getOTP, data, getHeaders());
};

const loginService = (data: LoginPayload) => {
  return network.post(
    API_PATHS.loginService,
    { ...data, tenant: tenantId },
    getHeaders()
  );
};

const forgotPassword = (data: ForgotPasswordPayload) => {
  return network.post(
    API_PATHS.forgotPassword,
    { ...data, tenant: tenantId },
    getHeaders()
  );
};

export default {
  signUp,
  getOTP,
  loginService,
  forgotPassword,
};
