/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import 'swiper/css';
import { setInitialCart } from './redux/features/cartStateSlice';
import { useAppDispatch } from './redux/redux-hooks';
import { routeObjects } from './routes/AppRoutes';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setInitialCart());
  }, []);
  const routes = useRoutes(routeObjects);
  return routes;
}

export default App;
