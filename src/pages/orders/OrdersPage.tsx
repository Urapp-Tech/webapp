import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import AlertBox from '../../components/common/SnackBar';
import useAlert from '../../hooks/alert.hook';
import OrdersHistory from './OrdersHistory';
import OrdersItemsReview from './OrdersItemReview';

type TabsType = 'ORDER_HISTORY' | 'REVIEW_ITEMS';

function OrdersPage() {
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const [selectedTab, setSelectedTab] = useState<TabsType>('ORDER_HISTORY');

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
                label="Order History"
                value="ORDER_HISTORY"
              />
              <Tab
                classes={{
                  selected: 'text-primary',
                }}
                label="Review Items"
                value="REVIEW_ITEMS"
              />
            </Tabs>
          </div>
          {selectedTab === 'ORDER_HISTORY' ? (
            <OrdersHistory
              setAlertSeverity={setAlertSeverity}
              setAlertMessage={setAlertMessage}
              setShowAlert={setShowAlert}
            />
          ) : (
            <OrdersItemsReview
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

export default OrdersPage;
