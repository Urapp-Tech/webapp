import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Sidebar from '../common/Sidebar'
import TopBar from '../common/TopBar'
import { useAppSelector } from '../../redux/redux-hooks'
import AuthLayout from './AuthLayout'

function MainLayout() {
  // const auth = useAppSelector((state) => state.authState);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (auth.user) {
  //     navigate('/dashboard');
  //   }
  //   if (!auth.user) {
  //     navigate('/auth/login');
  //   }
  // }, [auth.user]);
  return (
    <Box className="flex">
      <TopBar />
      <Sidebar />
      <div className="sidebar-backdrop"></div>
      <Box component="main" className="main">
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
