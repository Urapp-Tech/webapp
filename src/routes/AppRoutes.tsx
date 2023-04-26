/* eslint-disable import/prefer-default-export */
import { lazy, Suspense } from 'react';

import { RouteObject, Navigate } from 'react-router-dom';
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

const LoginPage = lazy(() => import('../pages/auth/login/LoginPage'));
const SignUpPage = lazy(() => import('../pages/auth/sign-up/SignUpPage'));
const ForgotPasswordPage = lazy(
  () => import('../pages/auth/forgot-password/ForgotPasswordPage')
);
const OTPVerificationPage = lazy(
  () => import('../pages/auth/otp-verification/OTPVerificationPage')
);
const ResetPasswordPage = lazy(
  () => import('../pages/auth/reset-password/ResetPasswordPage')
);
const HomePage = lazy(() => import('../pages/home/HomePage'));
const OrdersPage = lazy(() => import('../pages/orders/OrdersHistoryPage'));
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
export const routeObjects: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="auth" replace />,
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      {
        path: 'login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ForgotPasswordPage />
          </Suspense>
        ),
      },
      {
        path: 'otp-verification',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <OTPVerificationPage />
          </Suspense>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
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
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <OrdersPage />
          </Suspense>
        ),
      },
      {
        path: 'orders/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <OrderDetailsPage />
          </Suspense>
        ),
      },
      {
        path: 'payment-setting',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PaymentSettingPage />
          </Suspense>
        ),
      },
      {
        path: 'delivery-address',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DeliveryAddressPage />
          </Suspense>
        ),
      },
      {
        path: 'account',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AccountPage />
          </Suspense>
        ),
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          {
            path: 'profile',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AccountProfilePage />
              </Suspense>
            ),
          },
          {
            path: 'chat',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AccountChatPage />
              </Suspense>
            ),
          },
          {
            path: 'settings',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AccountSettingsPage />
              </Suspense>
            ),
          },
          {
            path: 'help-center',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AccountHelpPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'faqs',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FAQSPage />
          </Suspense>
        ),
      },
      {
        path: 'terms-and-conditions',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TermsAndConditionPage />
          </Suspense>
        ),
      },
      {
        path: 'privacy-policy',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PrivacyPolicyPage />
          </Suspense>
        ),
      },
      {
        path: 'my-basket',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MyBasketPage />
          </Suspense>
        ),
      },
    ],
  },
];
