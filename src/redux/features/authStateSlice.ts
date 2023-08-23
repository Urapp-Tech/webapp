import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { login, logout } = authStateSlice.actions;
export default authStateSlice.reducer;
