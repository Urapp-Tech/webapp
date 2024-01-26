import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SystemConfigData } from '../../types/app.types';
import { setTenantId } from '../../utilities/constant';
import { getItem, setItem } from '../../utilities/local-storage';
import setThemeColor from '../../utilities/theme';

type AppState = {
  systemConfig: SystemConfigData | null;
};

function initializeSystemConfig() {
  const systemConfig = getItem<SystemConfigData>('SYSTEM_CONFIG');
  if (systemConfig) {
    setTenantId(systemConfig.tenant);
    return systemConfig;
  }
  return null;
}

const initialState: AppState = {
  systemConfig: initializeSystemConfig(),
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setSystemConfig: (state, action: PayloadAction<SystemConfigData>) => {
      setItem('SYSTEM_CONFIG', action.payload);
      setTenantId(action.payload.tenant);
      setThemeColor(action.payload.theme.value.themeColor);
      state.systemConfig = action.payload;
    },
  },
});

export const { setSystemConfig } = appStateSlice.actions;

export default appStateSlice.reducer;
