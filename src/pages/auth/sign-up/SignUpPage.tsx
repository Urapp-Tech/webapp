/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useForm } from 'react-hook-form'
import assets from '../../../assets'
import { OTPPayload, SignupPayload } from '../../../interfaces/auth.interface'
import authService from '../../../services/Auth'
import { setSignUpData } from '../../../utilities/constant'
import AlertBox from '../../../components/common/SnackBar'

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState('')
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPayload>()
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const OtpVerification = (data: OTPPayload) => {
    authService
      .otpService(data)
      .then((response) => {
        if (response.data.success) {
          navigate('../otp-verification')
        }
      })
      .catch((error) => {
        setShowAlert(true)
        setAlertMessage(error.message)
        setAlertSeverity('error')
      })
  }
  const onsubmit = (data: SignupPayload) => {
    setSignUpData(data)
    const dataOtp = { email: data.email }
    OtpVerification(dataOtp)
  }
  return (
    <>
      {showAlert && (
        <AlertBox
          msg={alertMessage}
          setSeverty={alertSeverity}
          alertOpen={showAlert}
          setAlertOpen={setShowAlert}
        />
      )}
      <div className="fixed-at-top-left">
        <NavLink to="../login" className="go-back">
          <ArrowBackRoundedIcon className="icon-arrow" />
        </NavLink>
        <img className="logo" src={assets.images.logo} alt="" />
      </div>
      <div className="auth-form pt-12">
        <div className="custom-width">
          <h4 className="heading">Get Registered</h4>
          <FormControl className="field mt-4 mb-3" variant="standard">
            <InputLabel className="label" htmlFor="firstName">
              First Name
            </InputLabel>
            <Input
              className="input-container"
              id="firstName"
              type="firstName"
              {...register('firstName', { required: true })}
            />
            {errors.firstName && (
              <span className="text-red-500">First Name is required</span>
            )}
          </FormControl>
          <FormControl className="field mb-3" variant="standard">
            <InputLabel className="label" htmlFor="lastName">
              Last Name
            </InputLabel>
            <Input
              className="input-container"
              id="lastName"
              type="lastName"
              {...register('lastName', { required: true })}
            />
            {errors.lastName && (
              <span className="text-red-500">Last name is required</span>
            )}
          </FormControl>
          <FormControl className="field mb-3" variant="standard">
            <InputLabel className="label" htmlFor="phoneNumber">
              Phone Number
            </InputLabel>
            <Input
              className="input-container"
              id="phoneNumber"
              type="phoneNumber"
              {...register('phone', { required: true })}
            />
            {errors.phone && (
              <span className="text-red-500">Phone number is required</span>
            )}
          </FormControl>
          <FormControl className="field mb-3" variant="standard">
            <InputLabel className="label" htmlFor="email">
              Email
            </InputLabel>
            <Input
              className="input-container"
              id="email"
              type="email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </FormControl>

          <FormControl className="field mb-3" variant="standard">
            <InputLabel className="label" htmlFor="password">
              Password
            </InputLabel>
            <Input
              className="input-container"
              id="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    className="field-icon"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </FormControl>
          <FormControl className="field mb-3" variant="standard">
            <InputLabel className="label" htmlFor="postalCode">
              Postal Code
            </InputLabel>
            <Input
              className="input-container"
              id="postalCode"
              type="postalCode"
              {...register('postalCode', { required: true })}
            />
            {errors.postalCode && (
              <span className="text-red-500">Postal code is required</span>
            )}
          </FormControl>

          <div className="t-n-c">
            By Signing up. you accept our &nbsp;
            <NavLink to="../login">Terms and Conditions &nbsp;</NavLink>
            and &nbsp;
            <NavLink to="../login">Privacy Policy</NavLink>
          </div>
          <button
            type="button"
            className="btn-submit mt-5"
            onClick={handleSubmit(onsubmit)}
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="join-community register-community">
        <div className="content-container">
          <div className="content">
            <h1 className="heading">Join Our Community</h1>
            <p className="desc">
              Lorem ipusm dolor sit amet, coectetuer adipiscing elit sed diam
              nonummy et nibh euismod
            </p>
          </div>
          <img className="" src={assets.images.registerImage} alt="" />
        </div>
      </div>
    </>
  )
}

export default SignUpPage
