/* eslint-disable react-hooks/exhaustive-deps */
import { useRoutes } from 'react-router-dom';
import 'swiper/css';
import { routeObjects } from './routes/AppRoutes';

function App() {
  const routes = useRoutes(routeObjects);
  return routes;
}

export default App;
