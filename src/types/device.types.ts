export type DeviceRegistration = {
  token: string;
  deviceType: string;
  appUser?: string | null;
  name: string;
  isNotificationAllowed: boolean;
  tenant: string;
  deviceId: string | null;
};
