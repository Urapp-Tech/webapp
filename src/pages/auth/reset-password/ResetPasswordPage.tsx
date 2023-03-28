import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import assets from '../../../assets';

function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div className="relative h-full w-full">
      <NavLink
        to="../login"
        className="absolute left-20 top-16 flex aspect-square w-8 items-center justify-center rounded-full border-2 border-solid border-neutral-900 text-neutral-900"
      >
        <ArrowBackRoundedIcon className="m-0 p-0" />
      </NavLink>

      <div className="mx-auto flex h-full w-2/5 flex-col items-center justify-center gap-8">
        <img src={assets.images.logoBlack} alt="" />
        <div className="w-full text-center font-open-sans text-xl font-semibold text-neutral-900">
          Create Password
        </div>
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
          <InputLabel className="text-neutral-900" htmlFor="confirm-password">
            Confirm Password
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm-password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <button
          type="button"
          className="w-full rounded-xl bg-neutral-900 py-2 font-open-sans text-base font-semibold text-gray-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
