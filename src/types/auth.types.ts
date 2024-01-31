export type SignUpPayload = {
  password: string;
  email: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  otp: string;
  phone: string;
};

export type OTPPayload = {
  email: string;
};
export type OTPCodePayload = {
  code: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type FacebookLoginPayload = {
  accessToken: string;
};
