import devNetwork from '../utilities/devNetwork'

export interface AddressPayload {
  name: string
  address: string
  type: string
  latitude: number
  longitude: number
}

const getUserAddress = () => {
  return devNetwork.get('appUserAddress/list')
}
const userAddress = (data: AddressPayload) => {
  return devNetwork.post(`appUserAddress/add`, data)
}

const UpdateAddressStatus = (tenantId: string, id: string) => {
  return devNetwork.put(`appUserAddress/update/status/${tenantId}/${id}`, {})
}
const deleteUserAddress = (tenantId: string, id: string) => {
  return devNetwork.delete(`appUserAddress/delete/${tenantId}/${id}`)
}

export default {
  userAddress,
  getUserAddress,
  UpdateAddressStatus,
  deleteUserAddress,
}
