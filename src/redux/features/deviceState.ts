import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DeviceState = {
  deviceId: string
}

const initialState: DeviceState = {
  deviceId: '',
}

export const deviceStateSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload
    },
  },
})

export const { setId } = deviceStateSlice.actions
export default deviceStateSlice.reducer
