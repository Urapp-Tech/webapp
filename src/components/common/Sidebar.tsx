import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { setDropOff, setPickup } from '../../redux/features/DateAndTime';
import { logout } from '../../redux/features/authStateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';

const links = [
  {
    name: 'Home',
    path: 'home',
    icon: <HomeOutlinedIcon className="aside-list-icon" fontSize="inherit" />,
  },
  {
    name: 'Orders',
    path: 'orders',
    icon: (
      <AssignmentOutlinedIcon className="aside-list-icon" fontSize="inherit" />
    ),
  },
  // {
  //   name: 'Payment Setting',
  //   path: 'payment-setting',
  //   icon: (
  //     <CreditCardRoundedIcon className="aside-list-icon" fontSize="inherit" />
  //   ),
  // },
  {
    name: 'Delivery Address',
    path: 'delivery-address',
    icon: (
      <LocationOnOutlinedIcon className="aside-list-icon" fontSize="inherit" />
    ),
  },
  {
    name: 'Account',
    path: 'account',
    icon: (
      <PersonOutlineOutlinedIcon
        className="aside-list-icon"
        fontSize="inherit"
      />
    ),
  },
  {
    name: 'FAQs',
    path: 'faqs',
    icon: (
      <HelpOutlineOutlinedIcon className="aside-list-icon" fontSize="inherit" />
    ),
  },
];

function Sidebar() {
  const user = useAppSelector((state) => state.authState.user);
  const tenantConfig = useAppSelector(
    (state) => state.deviceStates.tenantConfig
  );

  const hasShopLinks = () => {
    if (!tenantConfig) {
      return false;
    }
    return (
      Boolean(tenantConfig.facebook) ||
      Boolean(tenantConfig.instagram) ||
      Boolean(tenantConfig.twitter) ||
      Boolean(tenantConfig.youtube) ||
      Boolean(tenantConfig.whatsapp) ||
      Boolean(tenantConfig.linkedin) ||
      false
    );
  };

  const dispatch = useAppDispatch();
  const [LoginUser, setLoginUser] = useState(user);

  const handleLogout = () => {
    dispatch(setPickup(null));
    dispatch(setDropOff(null));
    setLoginUser(null);
    dispatch(logout());
  };

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        className: 'left-sidebar',
      }}
    >
      <div className="sidebar-links">
        {links.map((link) => {
          // If user exists, show all links, else show only Home link FAQs Link
          if (LoginUser || link.name === 'Home') {
            return (
              <NavLink
                key={link.path}
                className={({ isActive }) =>
                  isActive ? 'item active' : 'item'
                }
                to={link.path}
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            );
          }
          return null; // Skip rendering links other than Home & FAQs if user is not logged in
        })}
      </div>
      <div className="sidebar-footer-content">
        {tenantConfig && hasShopLinks() ? (
          <div className="share-via">
            <h6 className="heading">Share</h6>
            <div className="social-icons">
              {tenantConfig.facebook ? (
                <a
                  href={tenantConfig.facebook}
                  aria-label="shop facebook link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton className="social-btn" onClick={() => null}>
                    <FacebookIcon className="text-3xl" />
                  </IconButton>
                </a>
              ) : null}

              {tenantConfig.instagram ? (
                <a
                  href={tenantConfig.instagram}
                  aria-label="shop instagram link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton className="social-btn" onClick={() => null}>
                    <InstagramIcon className="text-3xl" />
                  </IconButton>
                </a>
              ) : null}

              {tenantConfig.linkedin ? (
                <a
                  href={tenantConfig.linkedin}
                  aria-label="shop linkedin link"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >
                  <IconButton className="social-btn" onClick={() => null}>
                    <LinkedInIcon className="text-3xl" />
                  </IconButton>
                </a>
              ) : null}

              {tenantConfig.twitter ? (
                <a
                  href={tenantConfig.twitter}
                  aria-label="shop twitter link"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >
                  <IconButton className="social-btn" onClick={() => null}>
                    <TwitterIcon className="text-3xl" />
                  </IconButton>
                </a>
              ) : null}

              {tenantConfig.youtube ? (
                <a
                  href={tenantConfig.youtube}
                  aria-label="shop youtube link"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >
                  <IconButton className="social-btn" onClick={() => null}>
                    <YouTubeIcon className="text-3xl" />
                  </IconButton>
                </a>
              ) : null}

              {tenantConfig.whatsapp ? (
                <a
                  href={tenantConfig.whatsapp}
                  aria-label="shop whatsapp link"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                >
                  <IconButton className="social-btn" onClick={() => null}>
                    <WhatsAppIcon className="text-3xl" />
                  </IconButton>
                </a>
              ) : null}
            </div>
            <hr className="mb-4" />
            <NavLink className="link mb-2" to="./terms-and-conditions">
              Terms & Conditions
            </NavLink>
            <NavLink className="link" to="./privacy-policy">
              Privacy Policy
            </NavLink>
            <hr className="mt-4" />
          </div>
        ) : null}

        {LoginUser ? (
          <NavLink
            className="logout-link"
            to="/dashboard"
            onClick={() => handleLogout()}
          >
            <LogoutOutlinedIcon className="icon" />
            Logout
          </NavLink>
        ) : (
          <NavLink className="logout-link" to="/auth/login">
            <LogoutOutlinedIcon />
            Login
          </NavLink>
        )}
      </div>
    </Drawer>
  );
}

export default Sidebar;
