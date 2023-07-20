export interface DeviceRegisteration {
  token: string
  deviceType: string
  appUser?: string | null
  name: string
  isNotificationAllowed: boolean
  tenant: string
  deviceId: string | null
}
