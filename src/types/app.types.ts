export type GetSystemConfigResponse = {
  success: boolean;
  code: number;
  message: string;
  data: SystemConfigData;
};

export type SystemConfigData = {
  id: string;
  tenant: SystemTenant;
  logoffImage: null;
  createdDate: string;
  theme: SystemTheme;
  domain: string;
  parent: null;
  tenantConfig: SystemTenantConfig;
  banners: Array<any>;
};

export type SystemTenantConfig = {
  id: string;
  name: string;
  desc: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  logo: string;
  gstPercentage: number;
  email: null;
  minOrderAmount: number;
  deliveryFee: number;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  whatsapp: string;
  banner: null;
  shopAddress: string;
  enableLoyaltyProgram: boolean;
  loyaltyCoinConversionRate: number;
  requiredCoinsToRedeem: number;
  minimumDeliveryTime: number;
  deliveryUrgentFees: number;
  theme: string;
  shopSchedule: null;
  latitude: number;
  longitude: number;
  attendanceDistance: number;
  officeTimeIn: string;
  officeTimeOut: string;
};

export type SystemTheme = {
  id: string;
  key: string;
  value: ThemeValue;
  createdDate: string;
};

export type ThemeValue = {
  themeColor: ThemeColor;
  categoryColor: Array<string>;
};

export type ThemeColor = {
  faded: string;
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  secondary2: string;
};

export type SystemTenant = {
  id: string;
  name: string;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  tenantConfig: string;
  desc: null;
  parent: null;
  trialMode: boolean;
  trialStartDate: null;
  maxUserLimit: number;
  maxBranchLimit: number;
  trialModeLimit: number;
  userLimit: number;
  tenantType: string;
};
