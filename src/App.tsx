/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/AppRoutes';
import { setInitialCart } from './redux/features/cartStateSlice';
import { useAppDispatch } from './redux/redux-hooks';
import 'swiper/css';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setInitialCart());
  }, []);
  const routes = useRoutes(routeObjects);
  return routes;
}

export default App;
