import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import assets from '../../../assets';

function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleClick = () => {};
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      {/* <div className="fixed-at-top-left">
            <NavLink to="../login" className="go-back">
              <ArrowBackRoundedIcon className="icon-arrow" />
            </NavLink>
            <img className="logo" src={assets.images.logo} alt="" />
        </div>
        <div className="auth-form">
            <div className="custom-width">
              <h4 className="heading">Create Password</h4>
              <FormControl className="field mt-8 lg:mt-10" variant="standard">
                  <InputLabel className="label" htmlFor="password">
                    New Password
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
              <FormControl className="field mb-0" variant="standard">
                  <InputLabel className="label" htmlFor="confirm-password">
                    Confirm new Password
                  </InputLabel>
                  <Input
                    className="input-container"
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                              className="field-icon"
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
              <button type="button" className="btn-submit mt-8 lg:mt-10">
                  Submit
              </button>
            </div>
        </div>

        <div className="join-community forgot-pass-community">
            <div className="content-container">
              <div className="content">
                  <h1 className="heading">Join Our Community</h1>
                  <p className="desc">
                    Lorem ipusm dolor sit amet, coectetuer adipiscing elit sed diam
                    nonummy et nibh euismod
                  </p>
              </div>
              <img className="" src={assets.images.forgotPassImage} alt="" />
            </div>
        </div> */}
      <div
        className="flex h-full w-full items-center justify-center bg-[#F0F0F0]
        "
      >
        <div className="mx-auto  flex w-full  items-start justify-around max-[1560px]:items-center">
          <div className="w-[30%] self-start px-[30px]">
            <div className="max-h-[29px] w-full max-w-[150px] px-[25px] py-[40px]">
              <img
                src={assets.images.logo}
                alt="urlaundry"
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="pt-[100px]">
              <div className=" mb-[20px] text-center">
                <img
                  src={assets.images.keyIcon}
                  alt="email"
                  className="mx-auto h-[80px] w-[80px]"
                />
              </div>
              <span className="block text-center text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
                Enter New Password
              </span>
              <div className="mt-[20px]">
                <div className="form-group w-full">
                  <span className="text-[14px] font-medium leading-[normal] text-[#06152B]">
                    New Password
                  </span>
                  <FormControl className="my-1 w-full" variant="filled">
                    <Input
                      className="input-with-icon px-4 after:border-b-neutral-900"
                      id="password"
                      type=""
                      placeholder="*******"
                      name="password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            style={{ padding: 0 }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      disableUnderline
                    />
                  </FormControl>
                </div>
                <div className="form-group w-full">
                  <span className="text-[14px] font-medium leading-[normal] text-[#06152B]">
                    Confirm Password
                  </span>
                  <FormControl className="my-1 w-full" variant="filled">
                    <Input
                      className="input-with-icon px-4 after:border-b-neutral-900"
                      id="password"
                      type=""
                      placeholder="*******"
                      name="password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            style={{ padding: 0 }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      disableUnderline
                    />
                  </FormControl>
                </div>

                <div className="w-full xl:mt-[40px] 2xl:mt-[100px] ">
                  <Button
                    className="w-full bg-neutral-900 px-16 py-2 text-gray-50"
                    variant="contained"
                    color="inherit"
                    title="Login"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[70%] px-3 py-2">
            <div className="mx-auto  flex max-h-[834px] items-center justify-center overflow-hidden rounded-lg max-[1560px]:max-h-[96vh]">
              <img
                src={assets.images.forgotBg}
                alt="urlaundry"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
