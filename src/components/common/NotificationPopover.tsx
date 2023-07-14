import dayjs from 'dayjs';
import Popover from '@mui/material/Popover';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import NotificationPopoverClasses from './NotificationPopover.module.css';

type Props = {
  notification: HTMLButtonElement | null;
  setNotification: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
  anchorElement: Element | ((element: Element) => Element) | null | undefined;
};
function NotificationPopover({
  notification,
  setNotification,
  anchorElement,
}: Props) {
  const handleClose = () => {
    setNotification(null);
  };
  const open = Boolean(notification);
  const idProp = open ? 'notification-popover' : undefined;
  return (
    <Popover
      id={idProp}
      open={open}
      anchorEl={anchorElement}
      onClose={handleClose}
      className="notification-popover"
      anchorOrigin={{
        vertical: 40,
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className="all-notifications">
        <h3 className="day">Today</h3>
        <div className="item">
          <NotificationsNoneOutlinedIcon className="icon" />
          <div className="content">
            <div className="text">
              <h5 className="title">
                Your order is in process now
              </h5>
              <p className="date">
                {dayjs().subtract(1, 'day').format('ddd, DD MMM, YYYY')}
              </p>
            </div>
            <p className="desc">
              Wait at least 24 minutes
            </p>
          </div>
        </div>
        <div className="item">
          <NotificationsNoneOutlinedIcon className="icon" />
          <div className="content">
            <div className="text">
              <h5 className="title">
                Your order is in process now
              </h5>
              <p className="date">
                {dayjs().subtract(1, 'day').format('ddd, DD MMM, YYYY')}
              </p>
            </div>
            <p className="desc">
              Wait at least 24 minutes
            </p>
          </div>
        </div>
        <div className="item">
          <NotificationsNoneOutlinedIcon className="icon" />
          <div className="content">
            <div className="text">
              <h5 className="title">
                Your order is in process now
              </h5>
              <p className="date">
                {dayjs().subtract(1, 'day').format('ddd, DD MMM, YYYY')}
              </p>
            </div>
            <p className="desc">
              Wait at least 24 minutes
            </p>
          </div>
        </div>
        <h3 className="day">Yesterday</h3>
        <div className="item">
          <NotificationsNoneOutlinedIcon className="icon" />
          <div className="content">
            <div className="text">
              <h5 className="title">
                Your order is in process now
              </h5>
              <p className="date">
                {dayjs().subtract(1, 'day').format('ddd, DD MMM, YYYY')}
              </p>
            </div>
            <p className="desc">
              Wait at least 24 minutes
            </p>
          </div>
        </div>
        <div className="item">
          <NotificationsNoneOutlinedIcon className="icon" />
          <div className="content">
            <div className="text">
              <h5 className="title">
                Your order is in process now
              </h5>
              <p className="date">
                {dayjs().subtract(1, 'day').format('ddd, DD MMM, YYYY')}
              </p>
            </div>
            <p className="desc">
              Wait at least 24 minutes
            </p>
          </div>
        </div>
      </div>
    </Popover>
  );
}

export default NotificationPopover;
