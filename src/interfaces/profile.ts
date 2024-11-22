export interface GetUserProfileResponse {
  success: boolean;
  code: number;
  message: string;
  data: UserData;
}

export interface UserData {
  id: string;
  email: string;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
  tenant: string;
  phone: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  userType: string;
  loyaltyCoins: string;
}
