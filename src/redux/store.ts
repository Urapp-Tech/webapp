/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import dateStateReducer from './features/DateAndTime';
import appStateReducer from './features/appStateSlice';
import authStateReducer from './features/authStateSlice';
import cartStateReducer from './features/cartStateSlice';
import CategoryStateReducer from './features/categorySlice';
import StoreCategoryStateReducer from './features/storeCategorySlice';
import StoreCategoryItemStateReducer from './features/storeCategoryItemsSlice';
import deviceStateReducer from './features/deviceState';
import { categoryAPI } from './features/categorySliceAPI';
import { ratingAPI } from './features/ratingSliceAPI';
import { orderAPI } from './features/orderStateSliceAPI';
import AppointmentSliceReducer from './features/appointmentSlice';
import bannerSliceReducer from './features/bannerSlice';
import employeeRatingSliceReducer from './features/employeeRatingSlice';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    cartState: cartStateReducer,
    authState: authStateReducer,
    deviceStates: deviceStateReducer,
    categoryState: CategoryStateReducer,
    storeCategoryState: StoreCategoryStateReducer,
    storeCategoryItemState: StoreCategoryItemStateReducer,
    dateState: dateStateReducer,
    appointmentState: AppointmentSliceReducer,
    bannerState: bannerSliceReducer,
    employeeRatingState: employeeRatingSliceReducer,
    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [ratingAPI.reducerPath]: ratingAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryAPI.middleware,
      orderAPI.middleware,
      ratingAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
