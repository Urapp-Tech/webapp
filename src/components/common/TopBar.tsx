import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import assets from '../../assets';
import { useAppSelector } from '../../redux/redux-hooks';
import Notification from '../../services/Notification';
import NotificationPopover from './NotificationPopover';

function TopBar() {
  const user = useAppSelector((state) => state.authState.user);
  const { cartItems }: any = useAppSelector((state) => state.cartState);
  const [notificationElement, setNotificationElement] =
    useState<HTMLButtonElement | null>(null);
  const notificationIconButtonElement = useRef(null);
  const handleClick = () => {
    setNotificationElement(notificationIconButtonElement.current);
  };
  const [notificationList, setNotificationList] = useState([]);
  useEffect(() => {
    if (user) {
      Notification.notificationListService()
        .then((response) =>
          setNotificationList(response.data.data.notifications)
        )
        .catch((error) => console.log(error));
    }
  }, [user]);
  return (
    <AppBar position="fixed" className="topbar">
      <Toolbar>
        <NavLink className="logo" to="/dashboard/home">
          <img className="logo" src={assets.images.logo} alt="" />
        </NavLink>
        <div className="flex items-center">
          <IconButton
            className="mr-2 flex lg:hidden"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Badge
            badgeContent={notificationList?.length}
            max={99}
            classes={{
              badge: 'custom-badge',
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
          <div className="ml-4 mr-3 h-7 w-[1px] bg-neutral-300 md:ml-5 md:mr-4">
            {' '}
          </div>
          <NavLink to="./my-basket">
            <Badge
              badgeContent={cartItems.length}
              max={99}
              classes={{
                badge: 'custom-badge',
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
