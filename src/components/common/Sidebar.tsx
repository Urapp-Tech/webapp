import { NavLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailIcon from '@mui/icons-material/Mail';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import assets from '../../assets';

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
      PaperProps={{
        className: 'box-border w-80 border-r-0 bg-neutral-900 text-gray-50',
      }}
    >
      <List disablePadding>
        <Toolbar className="mb-5">
          <Stack className="w-full" direction="row" justifyContent="center">
            <img src={assets.images.logoWhite} alt="" />
          </Stack>
        </Toolbar>

        <div className="flex h-full w-full flex-col text-base ">
          {links.map((link) => {
            return (
              <NavLink
                key={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'w-full bg-gray-50 bg-opacity-5 px-4 py-3 text-gray-50'
                    : 'w-full px-4 py-3 text-neutral-400'
                }
                to={link.path}
              >
                <div className="flex items-center font-open-sans ">
                  <span className="text-3xl"> {link.icon} </span>
                  <div className="mr-2"> </div>
                  {link.name}
                </div>
              </NavLink>
            );
          })}
          <div className="flex-grow"> </div>
          <div className="mb-2 w-full px-4 font-open-sans text-base font-semibold text-gray-50">
            Share
          </div>
          <div className="mb-4 flex items-center gap-4 px-4">
            <IconButton className="p-0 text-gray-50" onClick={() => null}>
              <FacebookIcon className="text-3xl" />
            </IconButton>
            <IconButton className="p-0 text-gray-50" onClick={() => null}>
              <TwitterIcon className="text-3xl" />
            </IconButton>
            <IconButton className="p-0 text-gray-50" onClick={() => null}>
              <InstagramIcon className="text-3xl" />
            </IconButton>
            <IconButton className="p-0 text-gray-50" onClick={() => null}>
              <MailIcon className="text-3xl" />
            </IconButton>
          </div>
          <hr className="mb-2 mr-32 ml-4 bg-neutral-200" />
          <NavLink
            className="px-4 font-open-sans text-sm font-normal text-neutral-200"
            to="./terms-and-conditions"
          >
            Terms & Conditions
          </NavLink>
          <NavLink
            className="mb-2 px-4 font-open-sans text-sm font-normal text-neutral-200"
            to="./privacy-policy"
          >
            Privacy Policy
          </NavLink>
          <hr className="mb-6 mr-32 ml-4 bg-neutral-200" />

          <NavLink
            className="px-4 font-open-sans text-base font-normal text-neutral-200"
            to="/auth"
          >
            <LogoutOutlinedIcon className="mr-2 rotate-180" />
            Logout
          </NavLink>
        </div>
      </List>
    </Drawer>
  );
}

export default Sidebar;
