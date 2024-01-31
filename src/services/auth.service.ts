import {
  FacebookLoginPayload,
  ForgotPasswordPayload,
  LoginPayload,
  OTPPayload,
  SignUpPayload,
} from '../types/auth.types';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders, getTenantId } from '../utilities/constant';
import network from './network';

const signUp = (signupData: SignUpPayload) => {
  return network.post(API_PATHS.signUp, signupData, { headers: getHeaders() });
};

const getOTP = (data: OTPPayload) => {
  return network.post(API_PATHS.getOTP(), data, { headers: getHeaders() });
};

const loginService = (data: LoginPayload) => {
  return network.post(
    API_PATHS.loginService,
    { ...data, tenant: getTenantId() },
    { headers: getHeaders() }
  );
};

const loginWithFacebook = (data: FacebookLoginPayload) => {
  return network.post(
    API_PATHS.loginWithFacebook,
    { ...data, tenant: getTenantId() },
    { headers: getHeaders() }
  );
};

const forgotPassword = (data: ForgotPasswordPayload) => {
  return network.post(
    API_PATHS.forgotPassword,
    { ...data, tenant: getTenantId() },
    { headers: getHeaders() }
  );
};

export default {
  signUp,
  getOTP,
  loginService,
  forgotPassword,
  loginWithFacebook,
};
