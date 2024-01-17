import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Controller, FieldErrors, FieldValues, useForm } from 'react-hook-form';
import * as z from 'zod';
import Loader from '../../components/common/Loader';
import AlertBox from '../../components/common/SnackBar';
import useAlert from '../../hooks/alert.hook';
import profileService from '../../services/profile.service';
import promiseHandler from '../../utilities/promise-handler';

const accountProfileSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email(),
  phoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
  postalCode: z.string().min(1, { message: 'Postal Code is required' }),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  verifyPassword: z.string().optional(),
});

type AccountProfileType = z.infer<typeof accountProfileSchema>;

const formOptions = { resolver: zodResolver(accountProfileSchema) };

function AccountProfilePage() {
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm(formOptions);

  useEffect(() => {
    async function userProfile() {
      setIsLoading(true);
      const getUserProfilePromise = profileService.getUserProfile();
      const [getUserProfileResult, getUserProfileError] = await promiseHandler(
        getUserProfilePromise
      );
      setIsLoading(false);
      if (!getUserProfileResult) {
        setAlertSeverity('error');
        setAlertMessage(getUserProfileError.message);
        setShowAlert(true);
        return;
      }
      if (!getUserProfileResult.data.success) {
        setAlertSeverity('error');
        setAlertMessage(getUserProfileResult.data.message);
        setShowAlert(true);
        return;
      }
      setValue('firstName', getUserProfileResult.data.data.firstName);
      setValue('lastName', getUserProfileResult.data.data.lastName);
      setValue('email', getUserProfileResult.data.data.email);
      setValue('postalCode', getUserProfileResult.data.data.postalCode);
      setValue('phoneNumber', getUserProfileResult.data.data.phone);
    }
    userProfile();
  }, []);
  const onSubmitSuccess = async (data: FieldValues) => {
    const newData = data as AccountProfileType;
    if (newData.newPassword !== newData.verifyPassword) {
      setAlertSeverity('error');
      setAlertMessage('Password Does Not Match');
      setShowAlert(true);
      setValue('newPassword', '');
      setValue('verifyPassword', '');
      return;
    }
    type DataKey = keyof typeof newData;

    const keys = Object.keys(newData) as Array<DataKey>;
    keys.forEach((key) => {
      if (!newData[key]) {
        delete newData[key];
      }
    });
    const updateProfilePromise = profileService.updateUserProfile(newData);
    const [updateProfileResult, updateProfileError] =
      await promiseHandler(updateProfilePromise);
    if (!updateProfileResult) {
      setAlertSeverity('error');
      setAlertMessage(updateProfileError.message);
      setShowAlert(true);
      return;
    }
    if (!updateProfileResult.data.success) {
      setAlertSeverity('error');
      setAlertMessage(updateProfileResult.data.message);
      setShowAlert(true);
      return;
    }
    setAlertSeverity('success');
    setAlertMessage(updateProfileResult.data.message);
    setShowAlert(true);
  };

  const onSubmitError = (fieldErrors: FieldErrors<FieldValues>) => {
    console.log('fieldErrors :>> ', fieldErrors);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
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
              <div className="h-[5.75rem]"> </div>
              <Button
                color="inherit"
                className="btn-submit"
                onClick={handleSubmit(
                  (data) => setTimeout(() => onSubmitSuccess(data)),
                  (submitErrors) =>
                    setTimeout(() => onSubmitError(submitErrors))
                )}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AccountProfilePage;
