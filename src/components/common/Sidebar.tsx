import { Drawer, List, Stack, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/ur-laundry-logo.svg';
import colorConfigs from '../../configs/colorConfigs';
import sizeConfigs from '../../configs/sizeConfigs';

const routeObjects = [
  {
    name: 'Home',
    path: 'home',
  },
  {
    name: 'Orders',
    path: 'orders',
  },
  {
    name: 'Payment Setting',
    path: 'payment-setting',
  },
  {
    name: 'Delivery Address',
    path: 'delivery-address',
  },
  {
    name: 'Account',
    path: 'account',
  },
  {
    name: 'FAQs',
    path: 'faqs',
  },
];

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sizeConfigs.sidebar.width,
          boxSizing: 'border-box',
          borderRight: '0px',
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color,
        },
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: '20px' }}>
          <Stack sx={{ width: '100%' }} direction="row" justifyContent="center">
            <img src={logo} alt="" />
          </Stack>
        </Toolbar>

        <div className="flex w-full flex-col text-base">
          {routeObjects.map((route) => {
            return (
              <NavLink
                key={route.path}
                className={({ isActive }) =>
                  isActive
                    ? 'w-full bg-gray-50 bg-opacity-5 py-3'
                    : 'w-full py-3'
                }
                to={route.path}
              >
                {route.name}
              </NavLink>
            );
          })}
        </div>
      </List>
    </Drawer>
  );
}

export default Sidebar;
