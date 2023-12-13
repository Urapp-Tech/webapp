import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { AlertColor } from '@mui/material/Alert';
import Popover, { PopoverVirtualElement } from '@mui/material/Popover';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/authStateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import notificationService from '../../services/notification.service';
import AlertBox from './SnackBar';
import promiseHandler from '../../utilities/promise-handler';

type Props = {
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
  notification,
  setNotification,
  anchorElement,
}: Props) {
  const handleClose = () => {
    setNotification(null);
  };
  const user = useAppSelector((state) => state.authState.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const open = Boolean(notification);
  const idProp = open ? 'notification-popover' : undefined;
  const [notificationList, setNotificationList] = useState([]);
  const [alertMsg, setAlertMsg] = useState<any>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');

  const getNotificationList = useCallback(async () => {
    const getNotificationListPromise = notificationService.notificationList();
    const [getNotificationListResult, getNotificationListError] =
      await promiseHandler(getNotificationListPromise);
    if (!getNotificationListResult) {
      setAlertSeverity('error');
      setAlertMsg(getNotificationListError.message);
      setShowAlert(true);
      return;
    }
    if (!getNotificationListResult.data.success) {
      setAlertSeverity('error');
      setAlertMsg(getNotificationListResult.data.message);
      setShowAlert(true);
      return;
    }
    setNotificationList(getNotificationListResult.data.data.notifications);
  }, []);

  useEffect(() => {
    if (user) {
      getNotificationList();
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
