import { useRoutes, RouteObject, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AccountPage from './pages/account/AccountPage';
import DeliveryAddressPage from './pages/delivery-address/DeliveryAddressPage';
import FAQSPage from './pages/faqs/FAQSPage';
import HomePage from './pages/home/HomePage';
import OrdersPage from './pages/orders/OrdersPage';
import PaymentSettingPage from './pages/payment-setting/PaymentSettingPage';

const routeObjects: RouteObject[] = [
  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'payment-setting',
        element: <PaymentSettingPage />,
      },
      {
        path: 'delivery-address',
        element: <DeliveryAddressPage />,
      },
      {
        path: 'account',
        element: <AccountPage />,
      },
      {
        path: 'faqs',
        element: <FAQSPage />,
      },
    ],
  },
];

function App() {
  const routes = useRoutes(routeObjects);
  return routes;
}

export default App;
