import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
} from '@mui/material';
import assets from '../../../assets';

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const submitHandler = () => {
    navigate('/dashboard');
  };
  return (
    <div className="h-full w-full">
      <div className="mx-auto flex h-full w-2/5 flex-col items-center justify-center gap-4">
        <img src={assets.images.logoBlack} alt="" />
        <div className="w-full text-center font-open-sans text-xl font-semibold text-neutral-900">
          Sign in to Customer
        </div>
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

        <div className="flex w-full items-center">
          <FormControlLabel
            control={
              <Checkbox
                className="text-neutral-900"
                id="remember-me"
                name="remember-me"
              />
            }
            label="Remember me"
            className="font-open-sans text-sm font-normal text-neutral-500"
          />
          <div className="flex-grow"> </div>
          <NavLink
            className="font-open-sans text-sm font-semibold"
            to="../forgot-password"
          >
            Forgot Password ?
          </NavLink>
        </div>
        <button
          type="button"
          onClick={submitHandler}
          className="w-full rounded-xl bg-neutral-900 py-2 font-open-sans text-base font-semibold text-gray-50"
        >
          Login
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-xl bg-cyan-700 py-2 font-open-sans text-base font-semibold text-gray-50"
        >
          <img
            className="mr-2 aspect-[1/2] w-3"
            src={assets.images.facebook}
            alt=""
          />
          Login with Facebook
        </button>
        <div className="my-10"> </div>
        <div className="flex w-full items-center justify-between">
          <span className="font-open-sans text-sm font-normal text-neutral-500">
            Don&apos;t have an account yet ?
          </span>
          <NavLink
            className="font-open-sans text-base font-semibold text-neutral-900"
            to="../sign-up"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
