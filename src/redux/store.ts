import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './features/appStateSlice';
import cartStateReducer from './features/cartStateSlice';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    cartState: cartStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
