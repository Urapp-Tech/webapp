import axios from 'axios'
import { BASE_URL, token } from '../utilities/constant'

const post = (endPoint: string, data: any) => {
  return axios.post(`${BASE_URL}${endPoint}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
}

const get = (endPoint: string) => {
  return axios.get(`${BASE_URL}${endPoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
}

export default {
  post,
  get,
}
