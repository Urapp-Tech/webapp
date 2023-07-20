import { configureStore } from '@reduxjs/toolkit'
import appStateReducer from './features/appStateSlice'
import cartStateReducer from './features/cartStateSlice'
import authStateSlice from './features/authStateSlice'
import CategorySliceReducer from './features/categorySlice'
import deviceStateSlice from './features/deviceState'

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    cartState: cartStateReducer,
    authState: authStateSlice,
    deviceStates: deviceStateSlice,
    categoryState: CategorySliceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
