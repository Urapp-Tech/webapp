export type GetTenantDetailsResponse = {
  success: boolean;
  code: number;
  message: string;
  data: TenantDetails;
};

export type TenantDetails = {
  id: string;
  name: string;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  tenantConfig: TenantConfig;
  desc?: string;
  parent?: any;
  trialMode: boolean;
  trialStartDate?: any;
  maxUserLimit: number;
  maxBranchLimit: number;
  trialModeLimit: number;
  userLimit: number;
  tenantType: string;
  branches: any[];
};

export type TenantConfig = {
  id: string;
  name: string;
  desc: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  logo: string;
  gstPercentage: number;
  email: string;
  minOrderAmount: number;
  deliveryFee: number;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  whatsapp: string;
  banner: string;
  shopAddress: string;
  enableLoyaltyProgram: boolean;
  loyaltyCoinConversionRate: number;
  requiredCoinsToRedeem: number;
  minimumDeliveryTime: number;
  deliveryUrgentFees: number;
  theme: string;
  shopSchedule: Array<TenantShopSchedule>;
  latitude: number;
  longitude: number;
  attendanceDistance: number;
  officeTimeIn: string;
  officeTimeOut: string;
};

export type GetTenantConfigResponse = {
  success: boolean;
  code: number;
  message: string;
  data: TenantConfigData;
};

export type TenantConfigData = {
  id: string;
  name: string;
  desc: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  logo: string;
  gstPercentage: number;
  email: string;
  minOrderAmount: number;
  deliveryFee: number;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  whatsapp: string;
  banner: string;
  shopAddress: string;
  enableLoyaltyProgram: boolean;
  loyaltyCoinConversionRate: number;
  requiredCoinsToRedeem: number;
  minimumDeliveryTime: number;
  deliveryUrgentFees: number;
  theme: string;
  shopSchedule: Array<TenantShopSchedule>;
  latitude: number;
  longitude: number;
  attendanceDistance: number;
  officeTimeIn: string;
  officeTimeOut: string;
};

export type TenantShopSchedule = {
  day: string;
  openTime: string;
  breakTime: string;
  closeTime: string;
  breakOffTime: string;
};
