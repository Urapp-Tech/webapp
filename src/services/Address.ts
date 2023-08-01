import devNetwork from '../utilities/devNetwork'

export interface AddressPayload {
  name: string
  address: string
  type: string
  latitude: number
  longitude: number
}

const userAddress = (data: AddressPayload) => {
  return devNetwork.post(`appUserAddress/add`, data)
}

export default {
  userAddress,
}
