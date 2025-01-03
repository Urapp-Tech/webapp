import { getItem, setItem } from './local-storage';

export default function monitorIdleTime(
  intervalTime: number,
  idleTime: number,
  callback: () => void,
  initialTrigger = false
) {
  let intervalId: NodeJS.Timeout | string | number | undefined;

  if (idleTime < intervalTime) {
    throw new Error('Idle time should be greater than interval time');
  }

  const checkIdleTime = () => {
    const lastActivity = getItem<number>('LAST_ACTIVITY');
    if (!lastActivity) {
      setItem('LAST_ACTIVITY', Date.now());
      return;
    }
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastActivity;
    if (elapsedTime > idleTime) {
      if (intervalId) clearInterval(intervalId);
      callback();
    }
  };

  if (initialTrigger) checkIdleTime();

  intervalId = setInterval(checkIdleTime, intervalTime);
}
