export type SignUpPayload = {
  password: string;
  email: string;
  tenantId: '619943ef-8e9f-4a74-9e1e-4b299d19330d';
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
