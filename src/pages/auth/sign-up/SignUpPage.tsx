import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import assets from '../../../assets';
import { useForm } from 'react-hook-form';
import { OTPPayload, SignupPayload } from '../../../interfaces/auth.interface';
import authService from '../../../services/Auth';
import { setSignUpData } from '../../../utilities/constant';
import { setItem } from '../../../utilities/local-storage';

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPayload>();
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const onsubmit = (data: SignupPayload) => {
    setSignUpData(data);
    const dataOtp = { email: data.email };
    OtpVerification(dataOtp);
  };

  const OtpVerification = (data: OTPPayload) => {
    authService
      .otpService(data)
      .then((response) => {
        if (response.data.success) {
          navigate('../otp-verification');
        }
      })
      .catch((err) => console.log('err', err));
  };
  return (
    <div className="h-full w-full">
      <div className="mx-auto flex h-full w-2/5 flex-col items-center justify-center gap-3">
        <img src={assets.images.logoBlack} alt="" />
        <div className="w-full text-center font-open-sans text-xl font-semibold text-neutral-900">
          Get Registered
        </div>
        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="firstName">
            First Name
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="firstName"
            type="firstName"
            {...register('firstName', { required: true })}
          />
          {errors.firstName && (
            <span className="text-red-500">First Name is required</span>
          )}
        </FormControl>
        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="lastName">
            Last Name
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="lastName"
            type="lastName"
            {...register('lastName', { required: true })}
          />
          {errors.lastName && (
            <span className="text-red-500">Last name is required</span>
          )}
        </FormControl>
        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="phoneNumber">
            Phone Number
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="phone"
            type="phoneNumber"
            {...register('phone', { required: true })}
          />
          {errors.phone && (
            <span className="text-red-500">Phone number is required</span>
          )}
        </FormControl>
        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="email">
            Email
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="email"
            type="email"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
        </FormControl>

        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="password">
            Password
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: true })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}
        </FormControl>
        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="postalCode">
            Postal Code
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="postalCode"
            type="postalCode"
            {...register('postalCode', { required: true })}
          />
          {errors.postalCode && (
            <span className="text-red-500">Postal code is required</span>
          )}
        </FormControl>
        <button
          type="button"
          className="w-full rounded-xl bg-neutral-900 py-2 font-open-sans text-base font-semibold text-gray-50"
          onClick={handleSubmit(onsubmit)}
        >
          Sign Up
        </button>
        <div className="font-open-sans text-sm font-normal text-neutral-500">
          By Signing up. you accept our &nbsp;
          <NavLink className="font-semibold text-neutral-900" to="../login">
            Terms and Conditions &nbsp;
          </NavLink>
          and &nbsp;
          <NavLink className="font-semibold text-neutral-900" to="../login">
            Privacy Policy
          </NavLink>
        </div>
        <div className="my-2"> </div>
        <div className="flex w-full items-center justify-between">
          <span className="font-open-sans text-sm font-normal text-neutral-500">
            Already Have an Account ?
          </span>
          <NavLink
            className="font-open-sans text-base font-semibold text-neutral-900"
            to="../login"
          >
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
