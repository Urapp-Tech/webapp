import { DeviceRegisteration } from '../interfaces/deivce.interface'
import { tenantId } from '../utilities/constant'
import devNetwork from '../utilities/devNetwork'

const getTenantConfig = () => {
  return devNetwork.get(`shop/view/${tenantId}`)
}
const deviceRegisteration = (deviceData: DeviceRegisteration) => {
  return devNetwork.post(`app-user-device/register-device`, deviceData)
}

export default {
  getTenantConfig,
  deviceRegisteration,
}
