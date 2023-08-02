import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setItem } from '../../utilities/local-storage'

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
}
const initialState: DeviceState = {
  DeviceData: null,
  Address: '',
}

export const deviceStateSlice = createSlice({
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
  },
})

export const { setDeviceData, setUserAddress } = deviceStateSlice.actions
export default deviceStateSlice.reducer
