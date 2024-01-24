import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SystemConfigData } from '../../types/app.types';
import { getItem, setItem } from '../../utilities/local-storage';
import setThemeColor from '../../utilities/theme';

type AppState = {
  systemConfig: SystemConfigData | null;
};

const initialState: AppState = {
  systemConfig: getItem('SYSTEM_CONFIG'),
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setSystemConfig: (state, action: PayloadAction<SystemConfigData>) => {
      setItem('SYSTEM_CONFIG', action.payload);
      setThemeColor(action.payload.theme.value.themeColor);
      state.systemConfig = action.payload;
    },
  },
});

export const { setSystemConfig } = appStateSlice.actions;

export default appStateSlice.reducer;
