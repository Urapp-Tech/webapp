import { NavLink, Outlet } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

function AccountPage() {
  return (
    <div className="account-page p-4 sm:p-5 xl:p-7">
      <div className="grid grid-cols-5 gap-5">
        <div className="tab-pills col-span-1 h-full">
          <h4 className="main-heading">Account</h4>
          <div className="flex flex-col">
            <NavLink
              className={({ isActive }) => (isActive ? 'item active' : 'item')}
              to="profile"
            >
              <PersonOutlineOutlinedIcon /> <span>Profile</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'item active' : 'item')}
              to="settings"
            >
              <SettingsOutlinedIcon /> <span>Settings</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'item active' : 'item')}
              to="help-center"
            >
              <HeadphonesOutlinedIcon /> <span>Help Center</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'item active' : 'item')}
              to="chat"
            >
              <CommentOutlinedIcon /> <span>Chat With Us</span>
            </NavLink>
          </div>
        </div>
        <div className="tab-content col-span-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
