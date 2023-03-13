/* eslint-disable import/prefer-default-export */
import { RouteObject, Navigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import MainLayout from '../components/layout/MainLayout';
import AccountPage from '../pages/account/AccountPage';
import DeliveryAddressPage from '../pages/delivery-address/DeliveryAddressPage';
import FAQSPage from '../pages/faqs/FAQSPage';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/auth/login/LoginPage';
import OrdersPage from '../pages/orders/OrdersPage';
import PaymentSettingPage from '../pages/payment-setting/PaymentSettingPage';
import SignUpPage from '../pages/auth/sign-up/SignUpPage';
import ForgotPasswordPage from '../pages/auth/forgot-password/ForgotPasswordPage';
import OTPVerificationPage from '../pages/auth/otp-verification/OTPVerificationPage';
import ResetPasswordPage from '../pages/auth/reset-password/ResetPasswordPage';
import TermsAndConditionPage from '../pages/terms-and-conditions/TermsAndConditionPage';

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
      { path: 'login', element: <LoginPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'otp-verification', element: <OTPVerificationPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  },
  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: 'home', element: <HomePage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'payment-setting', element: <PaymentSettingPage /> },
      { path: 'delivery-address', element: <DeliveryAddressPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'faqs', element: <FAQSPage /> },
      { path: 'terms-and-conditions', element: <TermsAndConditionPage /> },
    ],
  },
];
