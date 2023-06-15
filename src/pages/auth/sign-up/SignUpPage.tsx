import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
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
    <>
      <div className='fixed-at-top-left'>
        <NavLink
          to="../login"
          className="go-back"
        >
          <ArrowBackRoundedIcon className="icon-arrow" />
        </NavLink>
        <img className='logo' src={assets.images.logo} alt="" />
      </div>
      <div className="auth-form pt-12">
        <div className="custom-width">
          <h4 className='heading'>
            Get Registered
          </h4>
          <FormControl className="field mt-4 mb-3" variant="standard">
            <InputLabel className="label" htmlFor="firstName">
              First Name
            </InputLabel>
            <Input
              className="input-container"
              id="firstName"
              type="firstName"
            />
          </FormControl>
          <FormControl className="field mb-3" variant="standard">
            <InputLabel className="label" htmlFor="lastName">
              Last Name
            </InputLabel>
            <Input
              className="input-container"
              id="lastName"
              type="lastName"
            />
          </FormControl>
          <FormControl className="field mb-3" variant="standard">
            <InputLabel className="label" htmlFor="phoneNumber">
              Phone Number
            </InputLabel>
            <Input
              className="input-container"
              id="phoneNumber"
              type="phoneNumber"
            />
          </FormControl>
          <FormControl className="field mb-3" variant="standard">
            <InputLabel className="label" htmlFor="email">
              Email
            </InputLabel>
            <Input
              className="input-container"
              id="email"
              type="email"
            />
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
            />
          </FormControl>
          <FormControl className="field mb-3" variant="standard">
            <InputLabel className="label" htmlFor="postalCode">
              Postal Code
            </InputLabel>
            <Input
              className="input-container"
              id="postalCode"
              type="postalCode"
            />
          </FormControl>
          <FormControl className="field mb-4.5" variant="standard">
            <InputLabel className="label" htmlFor="referralCode">
              Referral Code
            </InputLabel>
            <Input
              className="input-container"
              id="referralCode"
              type="referralCode"
            />
          </FormControl>
          <div className="t-n-c">
            By Signing up. you accept our &nbsp;
            <NavLink to="../login">
              Terms and Conditions &nbsp;
            </NavLink>
            and &nbsp;
            <NavLink to="../login">
              Privacy Policy
            </NavLink>
          </div>
          <button type="button" className="btn-submit mt-5">
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
          <img
            className=""
            src={assets.images.registerImage}
            alt=""
          />
        </div>
      </div>

    </>
  );
}

export default SignUpPage;
