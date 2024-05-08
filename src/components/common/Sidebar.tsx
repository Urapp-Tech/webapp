/* eslint-disable react/no-children-prop */
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import { useMediaQuery, useTheme } from '@mui/material';
import { setDropOff, setPickup } from '../../redux/features/DateAndTime';
import { logout } from '../../redux/features/authStateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import cn from '../../utilities/class-names';

const links = [
  {
    name: 'Appointments',
    path: 'home',
    icon: (isActive: boolean) => (
      <HomeOutlinedIcon
        className={cn(
          'h-auto w-5 text-foreground transition-all duration-[0.3s]',
          !isActive && 'opacity-75'
        )}
        fontSize="inherit"
      />
    ),
  },
  {
    name: 'Appointments History',
    path: 'appointments-history',
    icon: (isActive: boolean) => (
      <HistoryIcon
        className={cn(
          'h-auto w-5 text-foreground transition-all duration-[0.3s]',
          !isActive && 'opacity-75'
        )}
        fontSize="inherit"
      />
    ),
  },
  {
    name: 'Products',
    path: 'products',
    icon: (isActive: boolean) => (
      <ShoppingCartIcon
        className={cn(
          'h-auto w-5 text-foreground transition-all duration-[0.3s]',
          !isActive && 'opacity-75'
        )}
        fontSize="inherit"
      />
    ),
  },
  {
    name: 'Orders',
    path: 'orders',
    icon: (isActive: boolean) => (
      <AssignmentOutlinedIcon
        className={cn(
          'h-auto w-5 text-foreground transition-all duration-[0.3s]',
          !isActive && 'opacity-75'
        )}
        fontSize="inherit"
      />
    ),
  },
  // {
  //   name: 'Payment Setting',
  //   path: 'payment-setting',
  //   icon: (isActive:boolean) => (
  //     <CreditCardRoundedIcon className={cn("h-auto w-5 text-foreground transition-all duration-[0.3s]",{"text-foreground":isActive})} fontSize="inherit" />
  //   ),
  // },
  {
    name: 'Delivery Address',
    path: 'delivery-address',
    icon: (isActive: boolean) => (
      <LocationOnOutlinedIcon
        className={cn(
          'h-auto w-5 text-foreground transition-all duration-[0.3s]',
          !isActive && 'opacity-75'
        )}
        fontSize="inherit"
      />
    ),
  },
  {
    name: 'Account',
    path: 'account',
    icon: (isActive: boolean) => (
      <PersonOutlineOutlinedIcon
        className={cn(
          'h-auto w-5 text-foreground transition-all duration-[0.3s]',
          !isActive && 'opacity-75'
        )}
        fontSize="inherit"
      />
    ),
  },
  // {
  //   name: 'FAQs',
  //   path: 'faqs',
  //   icon: (isActive: boolean) => (
  //     <HelpOutlineOutlinedIcon
  //       className={cn(
  //         'h-auto w-5 text-foreground transition-all duration-[0.3s]',
  //         !isActive && 'opacity-75'
  //       )}
  //       fontSize="inherit"
  //     />
  //   ),
  // },
];

const InSecureRouts: string[] = [];

type Props = {
  openDrawer: boolean;
};

function Sidebar({ openDrawer = true }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
      // variant="permanent"
      variant={isMobile ? 'temporary' : 'permanent'}
      open={openDrawer}
      PaperProps={{
        className:
          'left-sidebar !bottom-0 !top-[86px] !box-border !h-auto !w-[300px] !border-r-0 !bg-primary !px-0 !py-[30px] !transition-all !delay-[0ms] !duration-[225ms] !ease-out',
      }}
    >
      <div className="mb-5">
        {links.map((link) => {
          // If user exists, show all links, else show only Home link FAQs Link
          if (LoginUser || InSecureRouts.find((r) => r === link.name)) {
            return (
              <NavLink
                key={link.path}
                className={({ isActive }) =>
                  cn(
                    'flex w-full items-center gap-x-3 bg-transparent px-6 py-3 text-base font-normal text-foreground transition-all duration-[0.3s] md:gap-x-4 md:px-7',
                    { 'bg-faded font-semibold text-foreground': isActive }
                  )
                }
                to={link.path}
                children={({ isActive }) => (
                  <>
                    {link.icon(isActive)}
                    <span className={cn(!isActive && 'opacity-75')}>
                      {link.name}
                    </span>
                  </>
                )}
              />
            );
          }
          return null; // Skip rendering links other than Home & FAQs if user is not logged in
        })}
      </div>
      <div className="mt-auto">
        {tenantConfig && hasShopLinks() ? (
          <div className="px-[30px] py-0">
            <h6 className="mb-3 text-base font-semibold leading-none text-foreground">
              Share
            </h6>
            <div className="mb-4 flex items-center gap-x-2.5 md:mb-7">
              {tenantConfig.facebook ? (
                <a
                  href={tenantConfig.facebook}
                  aria-label="shop facebook link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    className="p-0 text-foreground"
                    onClick={() => null}
                  >
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
                  <IconButton
                    className="p-0 text-foreground"
                    onClick={() => null}
                  >
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
                  <IconButton
                    className="p-0 text-foreground"
                    onClick={() => null}
                  >
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
                  <IconButton
                    className="p-0 text-foreground"
                    onClick={() => null}
                  >
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
                  <IconButton
                    className="p-0 text-foreground"
                    onClick={() => null}
                  >
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
                  <IconButton
                    className="p-0 text-foreground"
                    onClick={() => null}
                  >
                    <WhatsAppIcon className="text-3xl" />
                  </IconButton>
                </a>
              ) : null}
            </div>
            <hr className="mb-4 border-t-[0.5px] border-solid border-t-foreground" />
            <NavLink
              className="mb-2 block text-sm font-normal leading-snug text-foreground"
              to="./terms-and-conditions"
            >
              Terms & Conditions
            </NavLink>
            <NavLink
              className="block text-sm font-normal leading-snug text-foreground"
              to="./privacy-policy"
            >
              Privacy Policy
            </NavLink>
            <hr className="mt-4 border-t-[0.5px] border-solid border-t-foreground" />
          </div>
        ) : null}

        {LoginUser ? (
          <NavLink
            className="mt-3 flex w-full items-center gap-x-4 bg-transparent px-7 py-3 text-base font-normal text-foreground transition-all duration-[0.3s] focus:bg-faded focus:font-semibold focus:text-foreground active:bg-faded active:font-semibold active:text-foreground md:mt-7"
            to="/dashboard"
            onClick={() => handleLogout()}
          >
            <LogoutOutlinedIcon className="h-auto w-5 transition-all duration-[0.3s] " />
            <span className="text-foreground focus:text-foreground active:text-foreground">
              Logout
            </span>
          </NavLink>
        ) : (
          <NavLink
            className="mt-3 flex w-full items-center gap-x-4 bg-transparent px-7 py-3 text-base font-normal text-foreground transition-all duration-[0.3s] focus:bg-faded focus:font-semibold focus:text-foreground active:bg-faded active:font-semibold active:text-foreground md:mt-7"
            to="/auth/login"
          >
            <LogoutOutlinedIcon className="h-auto w-5 rotate-180 transition-all duration-[0.3s]" />
            <span className="text-foreground focus:text-foreground active:text-foreground">
              Login
            </span>
          </NavLink>
        )}
      </div>
    </Drawer>
  );
}

export default Sidebar;
