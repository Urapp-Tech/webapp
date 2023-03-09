import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Drawer, List, Stack, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/ur-laundry-logo.svg';
import colorConfigs from '../../configs/colorConfigs';
import sizeConfigs from '../../configs/sizeConfigs';

const links = [
  {
    name: 'Home',
    path: 'home',
    icon: <HomeOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Orders',
    path: 'orders',
    icon: <AssignmentOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Payment Setting',
    path: 'payment-setting',
    icon: <CreditCardRoundedIcon fontSize="inherit" />,
  },
  {
    name: 'Delivery Address',
    path: 'delivery-address',
    icon: <LocationOnOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'Account',
    path: 'account',
    icon: <PersonOutlineOutlinedIcon fontSize="inherit" />,
  },
  {
    name: 'FAQs',
    path: 'faqs',
    icon: <HelpOutlineOutlinedIcon fontSize="inherit" />,
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
          {links.map((link) => {
            return (
              <NavLink
                key={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'w-full bg-gray-50 bg-opacity-5 px-4 py-3'
                    : 'w-full px-4 py-3'
                }
                to={link.path}
              >
                <div className="flex items-center font-open-sans">
                  <span className="text-3xl"> {link.icon} </span>
                  <div className="mr-2"> </div>
                  {link.name}
                </div>
              </NavLink>
            );
          })}
        </div>
      </List>
    </Drawer>
  );
}

export default Sidebar;
