export type GetSystemConfigResponse = {
  success: boolean;
  code: number;
  message: string;
  data: SystemConfigData;
};

export type SystemConfigData = {
  id: string;
  tenant: string;
  layout?: any;
  createdDate: string;
  theme: SystemTheme;
  domainWebapp: string;
  domainAdminapp: string;
  tenantConfig: SystemTenantConfig;
  banner: any[];
};

export type SystemTenantConfig = {
  id: string;
  name: string;
  desc: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
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
  banner?: any;
  shopAddress?: any;
  enableLoyaltyProgram: boolean;
  loyaltyCoinConversionRate: number;
  requiredCoinsToRedeem: number;
  minimumDeliveryTime: number;
  deliveryUrgentFees: number;
  theme: string;
};

export type SystemTheme = {
  id: string;
  key: string;
  value: ThemeValue;
  createdDate: string;
};

export type ThemeValue = {
  themeColor: ThemeColor;
  categoryColor: string[];
};

export type ThemeColor = {
  faded: string;
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  secondary2: string;
};
