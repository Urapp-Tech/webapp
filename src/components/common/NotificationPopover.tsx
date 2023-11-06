import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Popover from '@mui/material/Popover';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Notification from '../../services/Notification';
import { setToken } from '../../utilities/constant';
import { getItem } from '../../utilities/local-storage';
import AlertBox from './SnackBar';

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
  const user = getItem('USER');
  const [notificationList, setNotificationList] = useState([]);
  const [alertMsg, setAlertMsg] = useState<any>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  useEffect(() => {
    if (user) {
      setToken(user?.token);
      Notification.notificationListService()
        .then((response) => {
          setNotificationList(response.data.data.notifications);
        })
        .catch((error) => {
          setAlertMsg(error.message);
          setShowAlert(true);
          setAlertSeverity('error');
        });
    }
  }, [user]);
  return (
    <>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverity={alertSeverity}
          alertOpen={showAlert}
          setAlertOpen={setShowAlert}
        />
      )}
      <Popover
        id={idProp}
        open={open}
        anchorEl={anchorElement}
        onClose={handleClose}
        className="notification-popover"
        anchorOrigin={{
          vertical: 40,
          horizontal: 37,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className="all-notifications">
          <h3 className="day">Today</h3>
          {notificationList &&
            notificationList?.map((item: any) => (
              <div className="item" key={item.id}>
                <NotificationsNoneOutlinedIcon className="icon" />
                <div className="content">
                  <div className="text">
                    <h5 className="title">{item.title}</h5>
                    <p className="date">
                      {dayjs().subtract(0, 'day').format('ddd, DD MMM, YYYY')}
                    </p>
                  </div>
                  <p className="desc">{item.desc}</p>
                </div>
              </div>
            ))}
        </div>
      </Popover>
    </>
  );
}

export default NotificationPopover;
