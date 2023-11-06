import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Loader from '../../components/common/Loader';
import AlertBox from '../../components/common/SnackBar';
import ProfileApi from '../../services/Profile';
import { setToken } from '../../utilities/constant';
import { getItem } from '../../utilities/local-storage';

function AccountProfilePage() {
  const user = getItem('USER');
  const [alertMsg, setAlertMsg] = useState<any>('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setIsLoading(true);
    setToken(user?.token);
    ProfileApi.profileService()
      .then((response) => {
        setIsLoading(false);
        setValue('firstName', response.data.data.firstName);
        setValue('lastName', response.data.data.lastName);
        setValue('email', response.data.data.email);
        setValue('postalCode', response.data.data.postalCode);
        setValue('phoneNumber', response.data.data.phone);
      })
      .catch((error) => {
        setAlertMsg(error.message);
        setShowAlert(true);
        setAlertSeverity('error');
      });
  }, [setValue, user?.token]);
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return isLoading ? (
    <Loader />
  ) : (
    <>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverity={alertSeverity}
          alertOpen={showAlert}
          setAlertOpen={setShowAlert}
        />
      )}
      <h4 className="main-heading">Profile</h4>
      <div className="tab-content-card">
        <form action="">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h5 className="heading-sm">Edit Profile</h5>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: 'First Name is required' }}
                render={({ field }) => (
                  <label htmlFor={field.name} className="mb-4 block">
                    <p className="label">First Name</p>
                    <input
                      type="text"
                      className="field"
                      id={field.name}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      ref={field.ref}
                      value={field.value}
                    />
                    {errors.firstName && (
                      <p className="font-open-sans text-xs text-red-500">
                        {errors.firstName.message?.toString()}
                      </p>
                    )}
                  </label>
                )}
              />
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: 'Last Name is required' }}
                render={({ field }) => (
                  <label htmlFor={field.name} className="mb-4 block">
                    <p className="label">Last Name</p>
                    <input
                      type="text"
                      className="field"
                      id={field.name}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      ref={field.ref}
                      value={field.value}
                    />
                    {errors.lastName && (
                      <p className="font-open-sans text-xs text-red-500">
                        {errors.lastName.message?.toString()}
                      </p>
                    )}
                  </label>
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <label htmlFor={field.name} className="mb-4 block">
                    <p className="label">Email Address</p>
                    <input
                      type="text"
                      className="field"
                      id={field.name}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      ref={field.ref}
                      value={field.value}
                    />
                    {errors.email && (
                      <p className="font-open-sans text-xs text-red-500">
                        {errors.email.message?.toString()}
                      </p>
                    )}
                  </label>
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={{ required: 'Phone Number is required' }}
                render={({ field }) => (
                  <label htmlFor={field.name} className="mb-4 block">
                    <p className="label">Phone Number</p>
                    <input
                      type="number"
                      className="field"
                      id={field.name}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      ref={field.ref}
                      value={field.value}
                    />
                    {errors.phoneNumber && (
                      <p className="font-open-sans text-xs text-red-500">
                        {errors.phoneNumber.message?.toString()}
                      </p>
                    )}
                  </label>
                )}
              />
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                rules={{ required: 'Postal Code is required' }}
                render={({ field }) => (
                  <label htmlFor={field.name} className="mb-4 block">
                    <p className="label">Postal Code</p>
                    <input
                      type="number"
                      className="field"
                      id={field.name}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      ref={field.ref}
                      value={field.value}
                    />
                    {errors.postalCode && (
                      <p className="font-open-sans text-xs text-red-500">
                        {errors.postalCode.message?.toString()}
                      </p>
                    )}
                  </label>
                )}
              />
            </div>
            <div>
              <h5 className="heading-sm">Change Password</h5>
              <Controller
                name="currentPassword"
                control={control}
                defaultValue=""
                rules={{ required: 'Current Password is required' }}
                render={({ field }) => (
                  <label htmlFor={field.name} className="mb-4 block">
                    <p className="label">Current Password</p>
                    <input
                      type="password"
                      className="field"
                      id={field.name}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      ref={field.ref}
                      value={field.value}
                    />
                    {errors.currentPassword && (
                      <p className="font-open-sans text-xs text-red-500">
                        {errors.currentPassword.message?.toString()}
                      </p>
                    )}
                  </label>
                )}
              />
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                rules={{ required: 'New Password is required' }}
                render={({ field }) => (
                  <label htmlFor={field.name} className="mb-4 block">
                    <p className="label">New Password</p>
                    <input
                      type="password"
                      className="field"
                      id={field.name}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      ref={field.ref}
                      value={field.value}
                    />
                    {errors.newPassword && (
                      <p className="font-open-sans text-xs text-red-500">
                        {errors.newPassword.message?.toString()}
                      </p>
                    )}
                  </label>
                )}
              />
              <Controller
                name="verifyPassword"
                control={control}
                defaultValue=""
                rules={{ required: 'Verify Password is required' }}
                render={({ field }) => (
                  <label htmlFor={field.name} className="mb-4 block">
                    <p className="label">Verify Password</p>
                    <input
                      type="password"
                      className="field"
                      id={field.name}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      ref={field.ref}
                      value={field.value}
                    />
                    {errors.verifyPassword && (
                      <p className="font-open-sans text-xs text-red-500">
                        {errors.verifyPassword.message?.toString()}
                      </p>
                    )}
                  </label>
                )}
              />

              <Button
                color="inherit"
                className="btn-submit"
                onClick={handleSubmit(onSubmit)}
              >
                Edit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AccountProfilePage;
