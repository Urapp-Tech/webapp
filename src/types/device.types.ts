export type GetTenantResponse = {
  success: boolean;
  code: number;
  message: string;
  data: TenantData;
};

export type TenantData = {
  id: string;
  name: string;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  tenantConfig: string;
  desc?: any;
  parent?: any;
  trialMode: boolean;
  trialStartDate?: any;
  maxUserLimit: number;
  maxBranchLimit: number;
  trialModeLimit: number;
  userLimit: number;
  shops: any[];
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
  deliveryFee?: any;
  facebook?: any;
  instagram?: any;
  linkedin?: any;
  twitter?: any;
  youtube?: any;
  whatsapp?: any;
  developmentDomain: string;
  liveDomain: string;
};

export type DeviceRegistration = {
  token: string;
  deviceType: string;
  appUser?: string | null;
  name: string;
  isNotificationAllowed: boolean;
  tenant: string;
  deviceId: string | null;
};
