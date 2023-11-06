import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import TopBar from '../common/TopBar';

function MainLayout() {
  return (
    <Box className="flex">
      <TopBar />
      <Sidebar />
      <div className="sidebar-backdrop" />
      <Box component="main" className="main">
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
