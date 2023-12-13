import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/features/authStateSlice';

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

export default network;
