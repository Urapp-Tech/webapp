import { useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/AppRoutes';
import { setInitialCart } from './redux/features/cartStateSlice';
import { useAppDispatch } from './redux/redux-hooks';

function App() {
  const dispatch = useAppDispatch();
  dispatch(setInitialCart());
  const routes = useRoutes(routeObjects);
  return routes;
}

export default App;
