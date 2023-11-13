import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setToken } from '../../utilities/constant';
import { clear, getItem, setItem } from '../../utilities/local-storage';

type RegisteredUser = {
  id: string;
  email: string;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
  tenant: string;
  phone: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  userType: string;
  token: string;
};

type AuthState = {
  user: RegisteredUser | null;
};

const storedUser = getItem('USER');
setToken(storedUser?.token || null);

const initialState: AuthState = {
  user: storedUser,
};

export const authStateSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<RegisteredUser>) => {
      state.user = action.payload;
      setItem('USER', action.payload);
      setToken(action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      setToken('');
      clear();
    },
  },
});

export const { login, logout } = authStateSlice.actions;
export default authStateSlice.reducer;
