import { SignupPayload } from '../interfaces/auth.interface'
import { setItem } from './local-storage'

export const BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL
// export const BASE_URL = 'https://dev.urapptech.com/api/v1/app/'
export const APP_USER_PREFIXES = 'app-user'
export const tenantId = '619943ef-8e9f-4a74-9e1e-4b299d19330d'

export let token = ''
export const setToken = (data: string) => {
  token = data
}
export const setSignUpData = (data: SignupPayload) => {
  setItem('SignupData', data)
}
