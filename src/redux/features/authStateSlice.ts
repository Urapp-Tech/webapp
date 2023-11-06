import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeItem, setItem } from '../../utilities/local-storage';

type RegisteredUser = {
  email: string;
  firstName: string;
  id: string;
  isActive: boolean;
  lastName: string;
  phone: string;
  postalCode: string;
  tenant: string;
  token: string;
  userType: string;
  createdDate: string;
  updatedDate: string;
};

type AuthState = {
  user: RegisteredUser | null;
};

const initialState: AuthState = {
  user: null,
};

export const authStateSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<RegisteredUser>) => {
      state.user = action.payload;
      setItem('USER', action.payload);
    },
    logout: (state) => {
      state.user = null;
      removeItem('USER');
    },
  },
});

export const { login, logout } = authStateSlice.actions;
export default authStateSlice.reducer;
