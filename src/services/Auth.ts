import network from '../utilities/network';
import {
  LoginPayload,
  OTPPayload,
  SignupPayload,
} from '../interfaces/auth.interface';
import { APP_USER_PREFIXES } from '../utilities/constant';

const signupService = (signupData: SignupPayload) => {
  return network.post(`${APP_USER_PREFIXES}/sign-up/app`, signupData);
};

const otpService = (data: OTPPayload) => {
  return network.post(`${APP_USER_PREFIXES}/get-otp`, data);
};

const LoginService = (data: LoginPayload) => {
  return network.post(`${APP_USER_PREFIXES}/sign-in/app`, data);
};
export default {
  signupService,
  otpService,
  LoginService,
};
