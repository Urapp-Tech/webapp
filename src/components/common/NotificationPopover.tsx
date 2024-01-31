import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Popover, { PopoverVirtualElement } from '@mui/material/Popover';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAlert from '../../hooks/alert.hook';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import notificationService from '../../services/notification.service';
import cn from '../../utilities/class-names';
import promiseHandler from '../../utilities/promise-handler';
import AlertBox from './SnackBar';

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
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const getNotificationList = useCallback(async () => {
    const getNotificationListPromise = notificationService.notificationList();
    const [getNotificationListResult, getNotificationListError] =
      await promiseHandler(getNotificationListPromise);
    if (!getNotificationListResult) {
      setAlertSeverity('error');
      setAlertMessage(getNotificationListError.message);
      setShowAlert(true);
      return;
    }
    if (!getNotificationListResult.data.success) {
      setAlertSeverity('error');
      setAlertMessage(getNotificationListResult.data.message);
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
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
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
