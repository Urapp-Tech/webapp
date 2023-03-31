import { NavLink, Outlet } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

function AccountPage() {
  return (
    <div className="container p-4">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 h-full border border-solid border-r-neutral-500">
          <div className="mb-4 font-open-sans text-3xl font-semibold text-neutral-900">
            Account
          </div>
          <div className="flex flex-col">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'flex w-full items-center border border-b border-t-0 border-l-0 border-r-0 border-neutral-500 py-3 font-open-sans text-base font-semibold text-neutral-900'
                  : 'flex w-full items-center border border-b border-t-0 border-l-0 border-r-0 border-neutral-500 py-3 font-open-sans text-base font-normal text-neutral-500'
              }
              to="../account"
            >
              <PersonOutlineOutlinedIcon className="mr-2" /> <div>Profile</div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'flex w-full items-center border border-b border-t-0 border-l-0 border-r-0 border-neutral-500 py-3 font-open-sans text-base font-semibold text-neutral-900'
                  : 'flex w-full items-center border border-b border-t-0 border-l-0 border-r-0 border-neutral-500 py-3 font-open-sans text-base font-normal text-neutral-500'
              }
              to="../settings"
            >
              <SettingsOutlinedIcon className="mr-2" /> <div>Settings</div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'flex w-full items-center border border-b border-t-0 border-l-0 border-r-0 border-neutral-500 py-3 font-open-sans text-base font-semibold text-neutral-900'
                  : 'flex w-full items-center border border-b border-t-0 border-l-0 border-r-0 border-neutral-500 py-3 font-open-sans text-base font-normal text-neutral-500'
              }
              to="../help-center"
            >
              <HeadphonesOutlinedIcon className="mr-2" /> <div>Help Center</div>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'flex w-full items-center border border-b border-t-0 border-l-0 border-r-0 border-neutral-500 py-3 font-open-sans text-base font-semibold text-neutral-900'
                  : 'flex w-full items-center border border-b border-t-0 border-l-0 border-r-0 border-neutral-500 py-3 font-open-sans text-base font-normal text-neutral-500'
              }
              to="../chat"
            >
              <CommentOutlinedIcon className="mr-2" /> <div>Chat With Us</div>
            </NavLink>
          </div>
        </div>
        <div className="col-span-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
