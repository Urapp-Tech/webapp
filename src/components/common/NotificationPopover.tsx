import dayjs from 'dayjs';
import Popover from '@mui/material/Popover';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationPopoverClasses from './NotificationPopover.module.css';

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
      anchorOrigin={{
        vertical: 32,
        horizontal: -352,
      }}
    >
      <div className={NotificationPopoverClasses.Content}>
        <div className={NotificationPopoverClasses.Title}>Today</div>
        <hr className={NotificationPopoverClasses.HorizontalLine} />
        <div className={NotificationPopoverClasses.Notification}>
          <NotificationsNoneOutlinedIcon
            className={NotificationPopoverClasses.NotificationIcon}
          />
          <div className={NotificationPopoverClasses.NotificationContent}>
            <div className={NotificationPopoverClasses.NotificationContentText}>
              Your order is in process now...
            </div>
            <div
              className={NotificationPopoverClasses.NotificationContentSubText}
            >
              Wait at least 24 minutes
            </div>
          </div>
          <div className={NotificationPopoverClasses.NotificationDate}>
            {dayjs().format('ddd, DD MMM, YYYY')}
          </div>
        </div>
        <hr className={NotificationPopoverClasses.HorizontalLine} />
        <div className={NotificationPopoverClasses.Notification}>
          <NotificationsNoneOutlinedIcon
            className={NotificationPopoverClasses.NotificationIcon}
          />
          <div className={NotificationPopoverClasses.NotificationContent}>
            <div className={NotificationPopoverClasses.NotificationContentText}>
              Your order is in process now...
            </div>
            <div
              className={NotificationPopoverClasses.NotificationContentSubText}
            >
              Wait at least 24 minutes
            </div>
          </div>
          <div className={NotificationPopoverClasses.NotificationDate}>
            {dayjs().format('ddd, DD MMM, YYYY')}
          </div>
        </div>
        <hr className={NotificationPopoverClasses.HorizontalLine} />
        <div className={NotificationPopoverClasses.Notification}>
          <NotificationsNoneOutlinedIcon
            className={NotificationPopoverClasses.NotificationIcon}
          />
          <div className={NotificationPopoverClasses.NotificationContent}>
            <div className={NotificationPopoverClasses.NotificationContentText}>
              Your order is in process now...
            </div>
            <div
              className={NotificationPopoverClasses.NotificationContentSubText}
            >
              Wait at least 24 minutes
            </div>
          </div>
          <div className={NotificationPopoverClasses.NotificationDate}>
            {dayjs().format('ddd, DD MMM, YYYY')}
          </div>
        </div>
        <hr className={NotificationPopoverClasses.HorizontalLine} />
        <div className={NotificationPopoverClasses.Title}>Yesterday</div>
        <hr className={NotificationPopoverClasses.HorizontalLine} />
        <div className={NotificationPopoverClasses.Notification}>
          <NotificationsNoneOutlinedIcon
            className={NotificationPopoverClasses.NotificationIcon}
          />
          <div className={NotificationPopoverClasses.NotificationContent}>
            <div className={NotificationPopoverClasses.NotificationContentText}>
              Your order is in process now...
            </div>
            <div
              className={NotificationPopoverClasses.NotificationContentSubText}
            >
              Wait at least 24 minutes
            </div>
          </div>
          <div className={NotificationPopoverClasses.NotificationDate}>
            {dayjs().subtract(1, 'day').format('ddd, DD MMM, YYYY')}
          </div>
        </div>
        <hr className={NotificationPopoverClasses.HorizontalLine} />
        <div className={NotificationPopoverClasses.Notification}>
          <NotificationsNoneOutlinedIcon
            className={NotificationPopoverClasses.NotificationIcon}
          />
          <div className={NotificationPopoverClasses.NotificationContent}>
            <div className={NotificationPopoverClasses.NotificationContentText}>
              Your order is in process now...
            </div>
            <div
              className={NotificationPopoverClasses.NotificationContentSubText}
            >
              Wait at least 24 minutes
            </div>
          </div>
          <div className={NotificationPopoverClasses.NotificationDate}>
            {dayjs().subtract(1, 'day').format('ddd, DD MMM, YYYY')}
          </div>
        </div>
        <hr className={NotificationPopoverClasses.HorizontalLine} />
      </div>
    </Popover>
  );
}

export default NotificationPopover;
