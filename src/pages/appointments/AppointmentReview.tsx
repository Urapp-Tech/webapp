import { AlertColor } from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import {
  useLazyOrderReviewItemsQuery,
  useReviewItemMutation,
} from '../../redux/features/orderStateSliceAPI';
import { OrderReviewItem } from '../../types/order.types';
import AppointmentRatingCard from './AppointmentRatingCard';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import {
  fetchEmployeeRatingSlice,
  updateEmployeeRatingSlice,
} from '../../redux/features/employeeRatingSlice';
import { EmployeeRatingData } from '../../interfaces/employee-ratings';

type AppointmentReviewProps = {
  setAlertSeverity: React.Dispatch<React.SetStateAction<AlertColor>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

function AppointmentReview({
  setAlertSeverity,
  setAlertMessage,
  setShowAlert,
}: AppointmentReviewProps) {
  const dispatch = useAppDispatch();
  const { employeeRatings, notify, notifyMessage, loading } = useAppSelector(
    (x) => x.employeeRatingState
  );

  const handleSubmitReview = (
    item: EmployeeRatingData,
    status: 'Completed' | 'Leave',
    review: string,
    star: number
  ) => {
    if (status === 'Completed' && star === 0 && review.trim() === '') {
      setAlertSeverity('error');
      setAlertMessage('Please provide at least a star rating or a review.');
      setShowAlert(true);
    } else {
      dispatch(
        updateEmployeeRatingSlice({ id: item.id, star, review, status })
      );
    }
  };

  useEffect(() => {
    if (notify) {
      setAlertSeverity('error');
      setAlertMessage(notifyMessage.text || '');
      setShowAlert(true);
    }
  }, [notify, notifyMessage]);

  useEffect(() => {
    dispatch(fetchEmployeeRatingSlice());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {employeeRatings.map((item) => (
        <AppointmentRatingCard
          key={item.id}
          data={item}
          submitReview={handleSubmitReview}
        />
      ))}
    </div>
  );
}

export default AppointmentReview;
