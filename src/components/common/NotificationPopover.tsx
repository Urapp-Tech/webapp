import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Popover, { PopoverVirtualElement } from '@mui/material/Popover';
import dayjs from 'dayjs';
import { Notification } from '../../types/notification.types';
import cn from '../../utilities/class-names';

type Props = {
  notificationList: Array<Notification>;
  notification: HTMLButtonElement | null;
  setNotification: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
  anchorElement:
    | Element
    | (() => Element)
    | PopoverVirtualElement
    | (() => PopoverVirtualElement)
    | null
    | undefined;
};
function NotificationPopover({
  notificationList,
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
      classes={{
        paper: cn(
          'w-[25rem] max-w-[calc(100%_-_2rem)] overflow-visible rounded-xl shadow-md'
        ),
      }}
      anchorOrigin={{
        vertical: 80,
        horizontal: 37,
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className="all-notifications">
        {notificationList &&
          notificationList.map((item) => (
            <div className="item" key={item.id}>
              <NotificationsNoneOutlinedIcon className="icon" />
              <div className="content">
                <div className="text">
                  <h5 className="title">{item.title}</h5>
                  <p className="date">
                    {dayjs(item.createdDate).format('ddd, DD MMM, YYYY')}
                  </p>
                </div>
                <p className="desc">{item.description}</p>
              </div>
            </div>
          ))}
      </div>
    </Popover>
  );
}

export default NotificationPopover;
