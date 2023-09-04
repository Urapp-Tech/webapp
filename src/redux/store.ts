import { configureStore } from '@reduxjs/toolkit'
import appStateReducer from './features/appStateSlice'
import cartStateReducer from './features/cartStateSlice'
import authStateReducer from './features/authStateSlice'
import CategoryStateReducer from './features/categorySlice'
import deviceStateReducer from './features/deviceState'
import dateStateReducer from './features/DateAndTime'

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    cartState: cartStateReducer,
    authState: authStateReducer,
    deviceStates: deviceStateReducer,
    categoryState: CategoryStateReducer,
    dateState: dateStateReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
