import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import AlertBox from '../../components/common/SnackBar';
import useAlert from '../../hooks/alert.hook';
import StoreAppointmentsList from './StoreAppointmentsList';
import AppointmentReview from './AppointmentReview';

type TabsType = 'APPOINTMENT_HISTORY' | 'REVIEW_APPOINTMENT';

function AppointmentHistoryPage() {
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const [selectedTab, setSelectedTab] = useState<TabsType>(
    'APPOINTMENT_HISTORY'
  );

  return (
    <>
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
      <div className="bg-background p-4 sm:p-5 xl:p-7">
        <div className="orders-page rounded-xl bg-white p-8">
          <div className="mb-4">
            <Tabs
              value={selectedTab}
              onChange={(event, value: TabsType) => setSelectedTab(value)}
              classes={{
                indicator: 'bg-primary',
              }}
            >
              <Tab
                classes={{
                  selected: 'text-primary',
                }}
                label="Appointment History"
                value="APPOINTMENT_HISTORY"
              />
              <Tab
                classes={{
                  selected: 'text-primary',
                }}
                label="Review Appointment"
                value="REVIEW_APPOINTMENT"
              />
            </Tabs>
          </div>
          {selectedTab === 'APPOINTMENT_HISTORY' ? (
            <StoreAppointmentsList />
          ) : (
            <AppointmentReview
              setAlertSeverity={setAlertSeverity}
              setAlertMessage={setAlertMessage}
              setShowAlert={setShowAlert}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AppointmentHistoryPage;
