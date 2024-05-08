/* eslint-disable import/prefer-default-export */
import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
// import LoginPage from '../pages/auth/login/LoginPage';
// import SignUpPage from '../pages/auth/sign-up/SignUpPage';
// import ForgotPasswordPage from '../pages/auth/forgot-password/ForgotPasswordPage';
// import OTPVerificationPage from '../pages/auth/otp-verification/OTPVerificationPage';
// import ResetPasswordPage from '../pages/auth/reset-password/ResetPasswordPage';
import MainLayout from '../components/layout/MainLayout';
// import HomePage from '../pages/home/HomePage';
// import OrdersPage from '../pages/orders/OrdersHistoryPage';
// import PaymentSettingPage from '../pages/payment-setting/PaymentSettingPage';
// import DeliveryAddressPage from '../pages/delivery-address/DeliveryAddressPage';
// import AccountPage from '../pages/account/AccountPage';
// import FAQSPage from '../pages/faqs/FAQSPage';
// import TermsAndConditionPage from '../pages/terms-and-conditions/TermsAndConditionPage';
// import PrivacyPolicyPage from '../pages/privacy-policy/PrivacyPolicyPage';
// import MyBasketPage from '../pages/my-basket/MyBasketPage';
// import OrderDetailsPage from '../pages/orders/OrderDetailsPage';
// import AccountProfilePage from '../pages/account/AccountProfilePage';
// import AccountChatPage from '../pages/account/AccountChatPage';
// import AccountHelpPage from '../pages/account/AccountHelpPage';
// import AccountSettingsPage from '../pages/account/AccountSettingPage';
import Loader from '../components/common/Loader';
import Page404 from '../pages/404/404';
import HomeItemDetail from '../pages/home/HomeItemDetail';
import AddAppointmentPage from '../pages/appointments/AddAppointmentPage';

const LoginPage = lazy(() => import('../pages/auth/login/LoginPage'));
const SignUpPage = lazy(() => import('../pages/auth/sign-up/SignUpPage'));
const ForgotPasswordPage = lazy(
  () => import('../pages/auth/forgot-password/ForgotPasswordPage')
);
const OTPVerificationPage = lazy(
  () => import('../pages/auth/otp-verification/OTPVerificationPage')
);
const SignOTPVerificationPage = lazy(
  () =>
    import('../pages/auth/signup-otp-verification/SignupOTPVerificationPage')
);
const ResetPasswordPage = lazy(
  () => import('../pages/auth/reset-password/ResetPasswordPage')
);
const HomePage = lazy(() => import('../pages/home/HomePage'));
const ProductPage = lazy(() => import('../pages/home/ProductPage'));
const OrdersPage = lazy(() => import('../pages/orders/OrdersPage'));
const PaymentSettingPage = lazy(
  () => import('../pages/payment-setting/PaymentSettingPage')
);
const DeliveryAddressPage = lazy(
  () => import('../pages/delivery-address/DeliveryAddressPage')
);
const AccountPage = lazy(() => import('../pages/account/AccountPage'));
const FAQSPage = lazy(() => import('../pages/faqs/FAQSPage'));
const TermsAndConditionPage = lazy(
  () => import('../pages/terms-and-conditions/TermsAndConditionPage')
);
const PrivacyPolicyPage = lazy(
  () => import('../pages/privacy-policy/PrivacyPolicyPage')
);
const MyBasketPage = lazy(() => import('../pages/my-basket/MyBasketPage'));
const OrderDetailsPage = lazy(() => import('../pages/orders/OrderDetailsPage'));
const AccountProfilePage = lazy(
  () => import('../pages/account/AccountProfilePage')
);
const AccountChatPage = lazy(() => import('../pages/account/AccountChatPage'));
const AccountHelpPage = lazy(() => import('../pages/account/AccountHelpPage'));
const AccountSettingsPage = lazy(
  () => import('../pages/account/AccountSettingPage')
);
// const StoreAppointmentsList = lazy(
//   () => import('../pages/appointments/StoreAppointmentsList')
// );
const AppointmentHistoryPage = lazy(
  () => import('../pages/appointments/AppointmentHistoryPage')
);
const RescheduleAppointmentPage = lazy(
  () => import('../pages/appointments/RescheduleAppointmentPage')
);

export const routeObjects: Array<RouteObject> = [
  {
    index: true,
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: 'error-404',
    element: <Page404 />,
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      {
        path: 'login',
        element: (
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <Suspense fallback={<Loader />}>
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <Suspense fallback={<Loader />}>
            <ForgotPasswordPage />
          </Suspense>
        ),
      },
      {
        path: 'otp-verification',
        element: (
          <Suspense fallback={<Loader />}>
            <OTPVerificationPage />
          </Suspense>
        ),
      },
      {
        path: 'signup-otp-verification',
        element: (
          <Suspense fallback={<Loader />}>
            <SignOTPVerificationPage />
          </Suspense>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <Suspense fallback={<Loader />}>
            <ResetPasswordPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      {
        path: 'home',
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'book-service',
        element: (
          <Suspense fallback={<Loader />}>
            <AddAppointmentPage />
          </Suspense>
        ),
      },
      {
        path: 'reschedule-appointment/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <RescheduleAppointmentPage />
          </Suspense>
        ),
      },
      {
        path: 'appointments-history',
        element: (
          <Suspense fallback={<Loader />}>
            <AppointmentHistoryPage />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<Loader />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: 'detail/:itemId',
        element: (
          <Suspense fallback={<Loader />}>
            <HomeItemDetail />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<Loader />}>
            <OrdersPage />
          </Suspense>
        ),
      },
      {
        path: 'orders/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <OrderDetailsPage />
          </Suspense>
        ),
      },
      {
        path: 'payment-setting',
        element: (
          <Suspense fallback={<Loader />}>
            <PaymentSettingPage />
          </Suspense>
        ),
      },
      {
        path: 'delivery-address',
        element: (
          <Suspense fallback={<Loader />}>
            <DeliveryAddressPage />
          </Suspense>
        ),
      },
      {
        path: 'account',
        element: (
          <Suspense fallback={<Loader />}>
            <AccountPage />
          </Suspense>
        ),
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          {
            path: 'profile',
            element: (
              <Suspense fallback={<Loader />}>
                <AccountProfilePage />
              </Suspense>
            ),
          },
          {
            path: 'chat',
            element: (
              <Suspense fallback={<Loader />}>
                <AccountChatPage />
              </Suspense>
            ),
          },
          {
            path: 'settings',
            element: (
              <Suspense fallback={<Loader />}>
                <AccountSettingsPage />
              </Suspense>
            ),
          },
          {
            path: 'help-center',
            element: (
              <Suspense fallback={<Loader />}>
                <AccountHelpPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'faqs',
        element: (
          <Suspense fallback={<Loader />}>
            <FAQSPage />
          </Suspense>
        ),
      },
      {
        path: 'terms-and-conditions',
        element: (
          <Suspense fallback={<Loader />}>
            <TermsAndConditionPage />
          </Suspense>
        ),
      },
      {
        path: 'privacy-policy',
        element: (
          <Suspense fallback={<Loader />}>
            <PrivacyPolicyPage />
          </Suspense>
        ),
      },
      {
        path: 'my-basket',
        element: (
          <Suspense fallback={<Loader />}>
            <MyBasketPage />
          </Suspense>
        ),
      },
    ],
  },
];
