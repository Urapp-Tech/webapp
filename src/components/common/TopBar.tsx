import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationPopover from './NotificationPopover';
import { useAppSelector } from '../../redux/redux-hooks';
import assets from '../../assets';

function TopBar() {
  const [notificationElement, setNotificationElement] =
    useState<HTMLButtonElement | null>(null);
  const notificationIconButtonElement = useRef(null);
  const handleClick = () => {
    setNotificationElement(notificationIconButtonElement.current);
  };
  const { cartItems } = useAppSelector((state) => state.cartState);
  return (
    <AppBar position="fixed" className="topbar">
      <Toolbar>
        <NavLink className="logo" to="/dashboard/home">
          <img className='logo' src={assets.images.logo} alt="" />
        </NavLink>
        <div className='flex items-center'>
          <IconButton
            className='flex lg:hidden mr-2'
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Badge
            badgeContent={20}
            max={99}
            classes={{
              badge:
                'custom-badge',
            }}
          >
            <IconButton
              ref={notificationIconButtonElement}
              onClick={handleClick}
              className="p-0 text-gray-50"
              aria-label="notifications-button"
              component="button"
            >
              <NotificationsNoneOutlinedIcon />
            </IconButton>
          </Badge>
          <NotificationPopover
            notification={notificationElement}
            setNotification={setNotificationElement}
            anchorElement={notificationIconButtonElement.current}
          />
          <div className="ml-4 md:ml-5 mr-3 md:mr-4 h-7 w-[1px] bg-neutral-300"> </div>
          <NavLink to="./my-basket">
            <Badge
              badgeContent={cartItems.length}
              max={99}
              classes={{
                badge:
                  'custom-badge',
              }}
            >
              <IconButton
                className="p-0 text-gray-50"
                aria-label="cart-button"
                component="button"
              >
                <ShoppingBagOutlinedIcon />
              </IconButton>
            </Badge>
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
