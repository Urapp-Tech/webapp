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
  desc?: any;
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
  color1: string;
  color2: string;
  color3?: any;
  logo?: any;
  gstPercentage: number;
  email?: any;
  minOrderAmount?: any;
  deliveryFee?: any;
  facebook: string;
  instagram: string;
  linkedin?: any;
  twitter?: any;
  youtube?: any;
  whatsapp?: any;
  developmentDomain: string;
  liveDomain: string;
  banner?: any;
  shopAddress?: any;
  enableLoyaltyProgram: boolean;
  loyaltyCoinConversionRate: number;
  requiredCoinsToRedeem: number;
  minimumDeliveryTime: number;
  deliveryUrgentFees: number;
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
  color1: string;
  color2: string;
  color3?: any;
  logo?: any;
  gstPercentage: number;
  email?: any;
  minOrderAmount?: any;
  deliveryUrgentFees?: any;
  facebook?: any;
  instagram?: any;
  linkedin?: any;
  twitter?: any;
  youtube?: any;
  whatsapp?: any;
  developmentDomain: string;
  liveDomain: string;
};
