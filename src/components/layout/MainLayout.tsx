import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../common/Sidebar';
import TopBar from '../common/TopBar';

function MainLayout() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <Box className="flex">
      <TopBar setDrawerState={setDrawerOpen} />
      <Sidebar openDrawer={drawerOpen} />
      {/* <div className="sidebar-backdrop" /> */}
      <Box component="main" className="main">
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
