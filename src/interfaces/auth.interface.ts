export interface SignupPayload {
  password: string
  email: string
  tenantId: '619943ef-8e9f-4a74-9e1e-4b299d19330d'
  firstName: string
  lastName: string
  postalCode: string
  otp: string
  phone: string
}

export interface OTPPayload {
  email: string
}
export interface OTPCodePayload {
  code: string
}
