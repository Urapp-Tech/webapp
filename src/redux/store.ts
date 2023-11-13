import { configureStore } from '@reduxjs/toolkit';
import dateStateReducer from './features/DateAndTime';
import appStateReducer from './features/appStateSlice';
import authStateReducer from './features/authStateSlice';
import cartStateReducer from './features/cartStateSlice';
import CategoryStateReducer from './features/categorySlice';
import deviceStateReducer from './features/deviceState';
import { categoryAPI } from './features/categorySliceAPI';
import { orderAPI } from './features/orderStateSliceAPI';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    cartState: cartStateReducer,
    authState: authStateReducer,
    deviceStates: deviceStateReducer,
    categoryState: CategoryStateReducer,
    dateState: dateStateReducer,
    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryAPI.middleware, orderAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
