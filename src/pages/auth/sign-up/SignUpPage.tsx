import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import assets from '../../../assets';

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
          />
        </FormControl>
        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="lastName">
            Last Name
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="lastName"
            type="lastName"
          />
        </FormControl>
        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="phoneNumber">
            Phone Number
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="phoneNumber"
            type="phoneNumber"
          />
        </FormControl>
        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="email">
            Email
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="email"
            type="email"
          />
        </FormControl>

        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="password">
            Password
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="password"
            type={showPassword ? 'text' : 'password'}
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
        </FormControl>
        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="postalCode">
            Postal Code
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="postalCode"
            type="postalCode"
          />
        </FormControl>
        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="referralCode">
            Referral Code
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="referralCode"
            type="referralCode"
          />
        </FormControl>
        <button
          type="button"
          className="w-full rounded-xl bg-neutral-900 py-2 font-open-sans text-base font-semibold text-gray-50"
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
