import { configureStore } from '@reduxjs/toolkit';
import dateStateReducer from './features/DateAndTime';
import appStateReducer from './features/appStateSlice';
import authStateReducer from './features/authStateSlice';
import cartStateReducer from './features/cartStateSlice';
import CategoryStateReducer from './features/categorySlice';
import deviceStateReducer from './features/deviceState';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    cartState: cartStateReducer,
    authState: authStateReducer,
    deviceStates: deviceStateReducer,
    categoryState: CategoryStateReducer,
    dateState: dateStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
