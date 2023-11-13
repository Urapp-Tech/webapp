import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, setItem } from '../../utilities/local-storage';

type DevicePayload = {
  deviceId: string;
  deviceType: string;
  id: string;
  isNotificationAllowed: boolean;
  name: string;
  tenant: string;
  token: string;
};

type DeviceState = {
  deviceData: DevicePayload | null;
  Address: string;
  AddressList: [];
};

const initialDeviceData = getItem<DevicePayload>('DEVICE_DATA');
const initialState: DeviceState = {
  deviceData: initialDeviceData,
  Address: '',
  AddressList: [],
};
export const deviceStateSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceData: (state, action: PayloadAction<DevicePayload>) => {
      state.deviceData = action.payload;
      setItem('DEVICE_DATA', action.payload);
    },
    setUserAddress: (state, action: PayloadAction<string>) => {
      state.Address = action.payload;
    },
    setUserNewAddress: (state: any, action: PayloadAction<any>) => {
      state.AddressList = [...state.AddressList, action.payload];
    },
    setUserAddressList: (state, action: PayloadAction<[]>) => {
      setItem('ADDRESS', action.payload);
      state.AddressList = action.payload;
    },
    setAddressStatus: (state: any, action: PayloadAction<any>) => {
      const addressList = state.AddressList || [];
      state.AddressList = addressList.map((el: any) => {
        if (el.id === action.payload.id) {
          return {
            ...el,
            isActive: true,
          };
        }
        if (el.isActive) {
          return {
            ...el,
            isActive: false,
          };
        }
        return el;
      });
    },
    deleteUserAddress: (state: any, action: PayloadAction<any>) => {
      state.AddressList = state.AddressList.filter(
        (el: any) => el.id !== action.payload.id
      );
    },
  },
});

export const {
  setDeviceData,
  setUserAddress,
  setUserAddressList,
  setAddressStatus,
  setUserNewAddress,
  deleteUserAddress,
} = deviceStateSlice.actions;
export default deviceStateSlice.reducer;
