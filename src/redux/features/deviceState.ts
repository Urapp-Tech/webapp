import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddUserAddressData,
  DeleteUserAddressData,
  UpdateAddressStatusData,
  UserAddressData,
} from '../../types/address.types';
import { TenantConfigData } from '../../types/device.types';
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

type TenantConfigPayload = TenantConfigData;

type DeviceState = {
  deviceData: DevicePayload | null;
  address: string;
  addressList: Array<UserAddressData>;
  tenantConfig: TenantConfigPayload | null;
};

const initialDeviceData = getItem<DevicePayload>('DEVICE_DATA');
const initialAddressList = getItem('ADDRESS') ?? [];
const initialTenantConfig = getItem<TenantConfigPayload>('TENANT_CONFIG');

const initialState: DeviceState = {
  deviceData: initialDeviceData,
  address: '',
  addressList: initialAddressList,
  tenantConfig: initialTenantConfig,
};
export const deviceStateSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceData: (state, action: PayloadAction<DevicePayload>) => {
      state.deviceData = action.payload;
      setItem('DEVICE_DATA', action.payload);
    },
    setTenantConfig: (state, action: PayloadAction<TenantConfigPayload>) => {
      state.tenantConfig = action.payload;
      setItem('TENANT_CONFIG', action.payload);
    },
    setUserAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setUserNewAddress: (state, action: PayloadAction<AddUserAddressData>) => {
      const transformedPayload: UserAddressData = {
        ...action.payload,
        isDeleted: false,
      };
      const newAddressList = state.addressList.map((address) => ({
        ...address,
        isActive: false,
      }));
      newAddressList.push(transformedPayload);
      state.addressList = newAddressList;
    },
    setUserAddressList: (
      state,
      action: PayloadAction<Array<UserAddressData>>
    ) => {
      const tempAddressList = action.payload.sort(
        (x: UserAddressData, y: UserAddressData) =>
          Number(y.isActive) - Number(x.isActive)
      );
      state.addressList = tempAddressList;
      setItem('ADDRESS', tempAddressList);
    },
    setAddressStatus: (
      state,
      action: PayloadAction<UpdateAddressStatusData>
    ) => {
      const tempAddressList: Array<UserAddressData> = state.addressList;
      state.addressList = tempAddressList
        .map((address) => {
          if (address.id === action.payload.id) {
            return {
              ...address,
              isActive: true,
            };
          }
          return {
            ...address,
            isActive: false,
          };
        })
        .sort(
          (x: UserAddressData, y: UserAddressData) =>
            Number(y.isActive) - Number(x.isActive)
        );
    },
    deleteUserAddress: (
      state,
      action: PayloadAction<DeleteUserAddressData>
    ) => {
      state.addressList = state.addressList.filter(
        (address) => address.id !== action.payload.id
      );
    },
  },
});

export const {
  setDeviceData,
  setTenantConfig,
  setUserAddress,
  setUserAddressList,
  setAddressStatus,
  setUserNewAddress,
  deleteUserAddress,
} = deviceStateSlice.actions;
export default deviceStateSlice.reducer;
