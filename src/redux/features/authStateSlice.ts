import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type RegisteredUser = {
  email: string
  firstName: string
  id: string
  isActive: boolean
  lastName: string
  phone: string
  postalCode: string
  tenant: string
  token: string
  userType: string
}

type AuthState = {
  user: RegisteredUser | null
}

function getUser() {
  const user = localStorage.getItem('SignupData')
  if (user) {
    return JSON.parse(user)
  }
  return null
}

const initialState: AuthState = {
  user: getUser(),
}

export const authStateSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<RegisteredUser>) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    },
  },
})

export const { login } = authStateSlice.actions
export default authStateSlice.reducer
