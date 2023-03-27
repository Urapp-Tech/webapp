/* eslint-disable import/prefer-default-export */
import { RouteObject, Navigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import LoginPage from '../pages/auth/login/LoginPage';
import SignUpPage from '../pages/auth/sign-up/SignUpPage';
import ForgotPasswordPage from '../pages/auth/forgot-password/ForgotPasswordPage';
import OTPVerificationPage from '../pages/auth/otp-verification/OTPVerificationPage';
import ResetPasswordPage from '../pages/auth/reset-password/ResetPasswordPage';
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/home/HomePage';
import OrdersPage from '../pages/orders/OrdersHistoryPage';
import PaymentSettingPage from '../pages/payment-setting/PaymentSettingPage';
import DeliveryAddressPage from '../pages/delivery-address/DeliveryAddressPage';
import AccountPage from '../pages/account/AccountPage';
import FAQSPage from '../pages/faqs/FAQSPage';
import TermsAndConditionPage from '../pages/terms-and-conditions/TermsAndConditionPage';
import PrivacyPolicyPage from '../pages/privacy-policy/PrivacyPolicyPage';
import MyBasketPage from '../pages/my-basket/MyBasketPage';
import OrderDetailsPage from '../pages/orders/OrderDetailsPage';

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
      { path: 'orders/:id', element: <OrderDetailsPage /> },
      { path: 'payment-setting', element: <PaymentSettingPage /> },
      { path: 'delivery-address', element: <DeliveryAddressPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'faqs', element: <FAQSPage /> },
      { path: 'terms-and-conditions', element: <TermsAndConditionPage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'my-basket', element: <MyBasketPage /> },
    ],
  },
];
