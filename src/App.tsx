/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { ClientJS } from 'clientjs';
import { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import 'swiper/css';
import AlertBox from './components/common/SnackBar';
import useAlert from './hooks/alert.hook';
import { setSystemConfig } from './redux/features/appStateSlice';
import {
  setDeviceData,
  setTenant,
  setTenantConfig,
} from './redux/features/deviceState';
import { useAppDispatch, useAppSelector } from './redux/redux-hooks';
import { routeObjects } from './routes/AppRoutes';
import appService from './services/app.service';
import network from './services/network';
import tenantService from './services/tenant.service';
import promiseHandler from './utilities/promise-handler';

function App() {
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();
  const persistedDeviceData = useAppSelector(
    (state) => state.deviceStates.deviceData
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const client = new ClientJS();
  const agent = client.getUserAgent();
  const fingerprint = client.getFingerprint();
  async function fetchIp() {
    const url = new URL('https://api.ipify.org');
    url.searchParams.append('format', 'json');
    const ipPromise = network.get(url.toString());
    const [ipResult, ipError] = await promiseHandler(ipPromise);
    if (!ipResult) {
      setAlertSeverity('error');
      setAlertMessage('Error Occurred');
      setShowAlert(true);
      return null;
    }
    return ipResult.data.ip;
  }

  useEffect(() => {
    async function getSystemConfig() {
      const getSystemConfigPromise = appService.getSystemConfig();
      const [getSystemConfigResult, getSystemConfigError] =
        await promiseHandler(getSystemConfigPromise);
      if (!getSystemConfigResult) {
        setAlertSeverity('error');
        setAlertMessage(getSystemConfigError.message);
        setShowAlert(true);
        navigate('/error-404');
        return;
      }
      if (!getSystemConfigResult.data.success) {
        setAlertSeverity('error');
        setAlertMessage(getSystemConfigResult.data.message);
        setShowAlert(true);
        navigate('/error-404');
        return;
      }
      dispatch(setSystemConfig(getSystemConfigResult.data.data));
    }
    getSystemConfig();

    async function initializeDeviceData() {
      if (persistedDeviceData) {
        return;
      }
      const ip = await fetchIp();
      if (!ip) {
        return;
      }
      const nameValue = `${agent.slice(0, 11)}-${ip}-${fingerprint}`;
      const getTenantPromise = tenantService.getTenant();
      const [getTenantResult, getTenantError] =
        await promiseHandler(getTenantPromise);
      if (!getTenantResult) {
        setAlertSeverity('error');
        setAlertMessage(getTenantError.message);
        setShowAlert(true);
        return;
      }
      if (!getTenantResult.data.success) {
        setAlertSeverity('error');
        setAlertMessage(getTenantResult.data.message);
        setShowAlert(true);
        return;
      }
      dispatch(setTenantConfig(getTenantResult.data.data.tenantConfig));
      dispatch(setTenant(getTenantResult.data.data));
      const deviceRegistrationPromise = tenantService.deviceRegistration({
        deviceId: fingerprint.toString(),
        deviceType: 'Web',
        isNotificationAllowed: true,
        name: nameValue,
        tenant: getTenantResult.data.data.id,
        token: 'Push notifications are not available on the web platform.',
      });
      const [deviceRegistrationResult, deviceRegistrationError] =
        await promiseHandler(deviceRegistrationPromise);
      if (!deviceRegistrationResult) {
        setAlertSeverity('error');
        setAlertMessage(deviceRegistrationError.message);
        setShowAlert(true);
        return;
      }
      if (!deviceRegistrationResult.data.success) {
        setAlertSeverity('error');
        setAlertMessage(deviceRegistrationResult.data.message);
        setShowAlert(true);
        return;
      }
      dispatch(setDeviceData(deviceRegistrationResult.data.data));
    }
    initializeDeviceData();
  }, []);

  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
  }
  const routes = useRoutes(routeObjects);
  return (
    <>
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
      {routes}
    </>
  );
}

export default App;
