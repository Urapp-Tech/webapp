import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/redux-hooks';
import notificationService from '../../services/notification.service';
import cn from '../../utilities/class-names';
import promiseHandler from '../../utilities/promise-handler';
import NotificationPopover from './NotificationPopover';

type Props = {
  setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
};

function TopBar({ setDrawerState }: Props) {
  const user = useAppSelector((state) => state.authState.user);
  const { cartItems }: any = useAppSelector((state) => state.cartState);
  const systemConfigData = useAppSelector(
    (state: any) => state.appState.systemConfig
  );
  const [notificationElement, setNotificationElement] =
    useState<HTMLButtonElement | null>(null);
  const notificationIconButtonElement = useRef(null);
  const handleClick = () => {
    setNotificationElement(notificationIconButtonElement.current);
  };
  const [notificationList, setNotificationList] = useState([]);

  const getNotificationList = useCallback(async () => {
    const getNotificationListPromise = notificationService.notificationList();
    const [getNotificationListResult, getNotificationListError] =
      await promiseHandler(getNotificationListPromise);
    if (!getNotificationListResult) {
      console.error('error1', getNotificationListError.message);
      return;
    }

    if (!getNotificationListResult.data.success) {
      console.error('error2', getNotificationListResult.data.message);
      return;
    }
    setNotificationList(getNotificationListResult.data.data.notifications);
  }, []);

  useEffect(() => {
    if (user) {
      getNotificationList().then();
    }
  }, [user]);

  return (
    <AppBar
      position="fixed"
      className="z-[500] !w-full !bg-primary !shadow-none"
    >
      <Toolbar
        classes={{
          regular: cn(
            'flex items-center justify-between px-4 py-4',
            'lg:px-14 lg:py-7'
          ),
        }}
      >
        <NavLink to="/dashboard/home">
          {systemConfigData?.tenantConfig?.logo ? (
            <img
              className="h-10 w-40"
              src={systemConfigData.tenantConfig.logo}
              alt=""
            />
          ) : (
            <span>Logo</span>
          )}
        </NavLink>
        <div className="flex items-center">
          <IconButton
            className="mr-2 flex lg:hidden"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerState((prev: boolean) => !prev)}
          >
            <MenuIcon />
          </IconButton>
          <Badge
            badgeContent={notificationList?.length}
            max={99}
            classes={{
              badge: cn(
                '!pointer-events-none !right-1 !top-1 !h-5 !w-5 !rounded-full !bg-[#FF4848] !font-open-sans !text-[.625rem] !font-semibold !text-white'
              ),
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
                badge: cn(
                  '!pointer-events-none !right-1 !top-1 !h-5 !w-5 !rounded-full !bg-[#FF4848] !font-open-sans !text-[.625rem] !font-semibold !text-white'
                ),
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
