import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import IconButton from '@mui/material/IconButton';

function TopBar() {
  return (
    <AppBar
      position="fixed"
      className="w-full bg-neutral-900 text-gray-50 shadow-none"
    >
      <Toolbar className="ml-80">
        <div className="flex-grow"> </div>

        <Badge
          badgeContent={20}
          max={99}
          classes={{
            badge:
              'bg-red-500 font-open-sans text-xs font-semibold leading-none text-gray-50',
          }}
        >
          <IconButton
            className="p-0 text-gray-50"
            aria-label="notifications-button"
            component="button"
          >
            <NotificationsNoneOutlinedIcon />
          </IconButton>
        </Badge>

        <div className="ml-7 mr-4 h-7 w-[1px] bg-neutral-300"> </div>
        <NavLink to="./my-basket">
          <Badge
            badgeContent={10}
            max={99}
            classes={{
              badge:
                'bg-red-500 font-open-sans text-xs font-semibold leading-none text-gray-50',
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
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
