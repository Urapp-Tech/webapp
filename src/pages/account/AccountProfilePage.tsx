import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import ProfileApi from '../../services/Profile'
import { setToken } from '../../utilities/constant'
import { getItem } from '../../utilities/local-storage'
import { useForm, Controller } from 'react-hook-form'
import AlertBox from '../../components/common/SnackBar'
import Loader from '../../components/common/Loader'

function AccountProfilePage() {
  const user = getItem('user')
  const [alertMsg, setAlertMsg] = useState<any>('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setToken(user?.token)
    ProfileApi.ProfileService()
      .then((response) => {
        setIsLoading(false)
        setValue('firstName', response.data.data.firstName)
        setValue('lastName', response.data.data.lastName)
        setValue('email', response.data.data.email)
        setValue('postalCode', response.data.data.postalCode)
        setValue('phoneNumber', response.data.data.phone)
      })
      .catch((error) => {
        setAlertMsg(error.message)
        setShowAlert(true)
        setAlertSeverity('error')
      })
  }, [setValue])
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return isLoading ? (
    <Loader />
  ) : (
    <>
      {showAlert && (
        <AlertBox
          msg={alertMsg}
          setSeverty={alertSeverity}
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
                  <label htmlFor="firstName" className="mb-4 block">
                    <p className="label">First Name</p>
                    <input
                      type="text"
                      id="firstName"
                      className="field"
                      {...field}
                    />
                    {errors.firstName && (
                      <p style={{ color: 'red' }}>
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
                  <label htmlFor="lastName" className="mb-4 block">
                    <p className="label">Last Name</p>
                    <input
                      type="text"
                      id="lastName"
                      className="field"
                      {...field}
                    />
                    {errors.lastName && (
                      <p style={{ color: 'red' }}>
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
                  <label htmlFor="email" className="mb-4 block">
                    <p className="label">Email Address</p>
                    <input
                      type="text"
                      id="email"
                      className="field"
                      {...field}
                    />
                    {errors.email && (
                      <p style={{ color: 'red' }}>
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
                  <label htmlFor="phoneNumber" className="mb-4 block">
                    <p className="label">Phone Number</p>
                    <input
                      type="number"
                      id="phoneNumber"
                      className="field"
                      {...field}
                    />
                    {errors.phoneNumber && (
                      <p style={{ color: 'red' }}>
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
                  <label htmlFor="postalCode" className="mb-4 block">
                    <p className="label">Postal Code</p>
                    <input
                      type="number"
                      id="postalCode"
                      className="field"
                      {...field}
                    />
                    {errors.postalCode && (
                      <p style={{ color: 'red' }}>
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
                  <label htmlFor="currentPassword" className="mb-4 block">
                    <p className="label">Current Password</p>
                    <input
                      type="password"
                      id="currentPassword"
                      className="field"
                      {...field}
                    />
                    {errors.currentPassword && (
                      <p style={{ color: 'red' }}>
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
                  <label htmlFor="newPassword" className="mb-4 block">
                    <p className="label">New Password</p>
                    <input
                      type="password"
                      id="newPassword"
                      className="field"
                      {...field}
                    />
                    {errors.newPassword && (
                      <p style={{ color: 'red' }}>
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
                  <label htmlFor="verifyPassword" className="mb-4 block">
                    <p className="label">Verify Password</p>
                    <input
                      type="password"
                      id="verifyPassword"
                      className="field"
                      {...field}
                    />
                    {errors.verifyPassword && (
                      <p style={{ color: 'red' }}>
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
  )
}

export default AccountProfilePage
