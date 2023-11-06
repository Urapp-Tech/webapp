import axios from 'axios';
import {
  LoginPayload,
  OTPPayload,
  SignupPayload,
} from '../interfaces/auth.interface';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';

const signupService = (signupData: SignupPayload) => {
  return axios.post(API_PATHS.signupService, signupData, getHeaders());
};

const otpService = (data: OTPPayload) => {
  return axios.post(API_PATHS.otpService, data, getHeaders());
};

const loginService = (data: LoginPayload) => {
  return axios.post(API_PATHS.loginService, data, getHeaders());
};
export default {
  signupService,
  otpService,
  loginService,
};
