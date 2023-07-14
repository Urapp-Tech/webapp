import { configureStore } from '@reduxjs/toolkit'
import appStateReducer from './features/appStateSlice'
import cartStateReducer from './features/cartStateSlice'
import authStateSlice from './features/authStateSlice'

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    cartState: cartStateReducer,
    authState: authStateSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
