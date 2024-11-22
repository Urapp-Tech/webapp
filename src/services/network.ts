import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { logout } from '../redux/features/authStateSlice';
import { store } from '../redux/store';
import { BASE_URL } from '../utilities/constant';

const network = axios.create();

network.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      store.dispatch(logout());
      window.location.replace('/');
    } else if (status === 404) {
      // Handle not found errors
    } else {
      // Handle other errors
    }
    return Promise.reject(error);
  }
);

export const getWithQueryParam = (
  endPoint: string,
  queryParams: Record<string, string> = {}
) => {
  const url = new URL(endPoint, BASE_URL);
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return axios.get(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default network;
