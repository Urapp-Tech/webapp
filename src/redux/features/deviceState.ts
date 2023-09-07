import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setItem } from '../../utilities/local-storage'
import Address from '../../services/Address'

type DevicePayload = {
  deviceId: string
  deviceType: string
  id: string
  isNotificationAllowed: boolean
  name: string
  tenant: string
  token: string
}

type DeviceState = {
  DeviceData: DevicePayload | null
  Address: string
  AddressList: []
}
const initialState: DeviceState = {
  DeviceData: null,
  Address: '',
  AddressList: [],
}
export const deviceStateSlice: any = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceData: (state, action: PayloadAction<DevicePayload>) => {
      state.DeviceData = action.payload
      setItem('deviceData', JSON.stringify(action.payload))
    },
    setUserAddress: (state, action: PayloadAction<string>) => {
      state.Address = action.payload
    },
    setUserNewAddress: (state: any, action: PayloadAction<any>) => {
      state.AddressList = [...state.AddressList, action.payload]
    },
    setUserAddressList: (state, action: PayloadAction<[]>) => {
      setItem('Address', action.payload)
      state.AddressList = action.payload
    },
    setAddressStatus: (state: any, action: PayloadAction<any>) => {
      const addressList = state.AddressList || []
      state.AddressList = addressList.map((el: any) => {
        if (el.id === action.payload.id) {
          return {
            ...el,
            isActive: true,
          }
        } else if (el.isActive) {
          return {
            ...el,
            isActive: false,
          }
        } else {
          return el
        }
      })
    },
    deleteUserAddress: (state: any, action: PayloadAction<any>) => {
      state.AddressList = state.AddressList.filter(
        (el: any) => el.id !== action.payload.id,
      )
    },
  },
})

export const {
  setDeviceData,
  setUserAddress,
  setUserAddressList,
  setAddressStatus,
  setUserNewAddress,
  deleteUserAddress,
} = deviceStateSlice.actions
export default deviceStateSlice.reducer
