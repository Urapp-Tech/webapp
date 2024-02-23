/* eslint-disable react/jsx-props-no-spreading */
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import AlertBox from '../../../components/common/SnackBar';
import useAlert from '../../../hooks/alert.hook';
import authService from '../../../services/auth.service';
import { OTPPayload, SignUpPayload } from '../../../types/auth.types';
import { setSignUpData } from '../../../utilities/constant';
import promiseHandler from '../../../utilities/promise-handler';

function SignUpPage() {
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpPayload>();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const OtpVerification = async (data: OTPPayload) => {
    const getOPTPromise = authService.getOTP(data);
    const [getOPTResult, getOPTError] = await promiseHandler(getOPTPromise);
    if (!getOPTResult) {
      setShowAlert(true);
      setAlertMessage(getOPTError.message);
      setAlertSeverity('error');
      return;
    }
    if (!getOPTResult.data.success) {
      setShowAlert(true);
      setAlertMessage(getOPTResult.data.message);
      setAlertSeverity('error');
      return;
    }
    navigate('../otp-verification');
  };

  const onsubmit = async (data: SignUpPayload) => {
    setSignUpData(data);
    const dataOtp = { email: data.email };
    await OtpVerification(dataOtp);
  };
  return (
    <>
      {/* <div className="auth-main">
        <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />

      <div className="fixed-at-top-left">
        <NavLink to="../login" className="go-back">
          <ArrowBackRoundedIcon className="icon-arrow" />
        </NavLink>
        <img className="logo" src={assets.images.logo} alt="" />
      </div>
      <div className="auth-form pt-12">
        <div className="custom-width">
          <h4 className="heading">Get Registered</h4>
          <FormControl className="field mb-3 mt-4" variant="standard">
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
      
        </div> */}


      <div className="flex h-full w-full items-center justify-center bg-[#F0F0F0]">
        <div className="mx-auto  flex w-full  items-center justify-around max-[1560px]:items-center">
          <div className="w-[30%] self-start  px-[30px] h-full">
  
            <div className="max-h-[29px] w-full max-w-[150px] px-[25px] py-[40px] ">
              <img
                // src={systemConfig?.shopLogo ?? systemConfig?.shopName}
                src={assets.images.logo}
                alt="urlaundry"
                className="h-auto w-full object-contain"
              />
            </div>
         

            <div className="mt-[50px] ">
              <h1 className="mb-4 text-center text-[24px] font-bold capitalize leading-[normal] text-black">
                Get Registered
              </h1>
              <div className='flex justify-between items-center'>
              <FormControl className="my-1 w-full form-group flex-1 pr-2" variant="standard">
                <span className='text-[14px] font-normal  leading-[normal] text-[#06152B] mb-1'>
                  First Name
                </span>
                <Input
                   className="input-with-icon bg-white px-1 rounded-md text-[14px]"
                  placeholder='First'
                  id="email"
                  type="text"
                  disableUnderline
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </FormControl>
              <FormControl className="flex-1 my-1 w-full form-group pl-2" variant="standard">
                <span className='text-[14px] ffont-normal  leading-[normal] text-[#06152B] mb-1'>
                  Last Name
                </span>
                <Input
                   className="input-with-icon bg-white px-1 rounded-md text-[14px]"
                  placeholder='Last'
                  id="name"
                  type="text"
                  disableUnderline
                />

              </FormControl>
              </div>
             
              <FormControl className="my-1 w-full form-group" variant="standard">
                <span className='text-[14px] font-normal  leading-[normal] text-[#06152B] mb-1'>
                  Phone number
                </span>
                <Input
                   className="input-with-icon bg-white px-1 rounded-md text-[14px]"
                  placeholder='urlaundry@gmail.com'
                  id="number"
                  type="number"
                  disableUnderline
                />

              </FormControl>
              <FormControl className="my-1 w-full form-group" variant="standard">
                <span className='text-[14px] font-normal  leading-[normal] text-[#06152B] mb-1'>
                  Email
                </span>
                <Input
                 className="input-with-icon bg-white px-1 rounded-md text-[14px]"
                  placeholder='urlaundry@gmail.com'
                  id="email"
                  type="email"
                  disableUnderline
                />

              </FormControl>
              <FormControl className="my-1 w-full form-group" variant="standard">
                <span className='text-[14px] font-normal  leading-[normal] text-[#06152B] mb-1'>
                  Password
                </span>
                <Input
                  className="input-with-icon bg-white px-1 rounded-md text-[14px]"
                  placeholder='urlaundry@gmail.com'
                  id="password"
                  type="password"
                  disableUnderline
                />

              </FormControl>
              <FormControl className="my-1 w-full form-group" variant="standard">
                <span className='text-[14px] font-normal leading-[normal] text-[#06152B] mb-1'>
                 Postal Code
                </span>
                <Input
                  className="input-with-icon bg-white px-1 rounded-md text-[14px]"
                  placeholder='urlaundry@gmail.com'
                  id="email"
                  type="number"
                  disableUnderline
                />

              </FormControl>
              {/* <FormControl className="field mb-3 mt-4" variant="standard">
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
              </FormControl> */}

              <div className="my-2 font-sans text-[14px] font-normal leading-[normal] text-[#06152B] text-left">
                By Signing up. you accept our &nbsp;
                <NavLink to="../login">Terms and Conditions &nbsp;</NavLink>
                and &nbsp;
                <NavLink to="../login">Privacy Policy</NavLink>
              </div>
              <button
                type="button"
                className="btn-submit mt-5 w-full bg-neutral-900 px-16 py-2 text-gray-50 rounded-lg"
                onClick={handleSubmit(onsubmit)}
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="w-[70%] px-3 py-2">
            {/* <div className="mx-auto max-w-[800px] overflow-hidden rounded-lg flex justify-center items-center min-h-[800px] min-[1600px]:max-w-[934px] "> */}
            <div className="mx-auto  flex max-h-[834px] items-center justify-center overflow-hidden rounded-lg max-[1560px]:max-h-[96vh]">
              {/* {systemConfig?.logoffImage  */}
              {/* ?  */}

              <img
                // src={systemConfig?.logoffImage || assets.images.bgLogin}
                src={assets.images.forgotBg}
                alt="urlaundry"
                className="h-full w-full object-contain"
              />

              {/* : */}

              {/* <div className="flex flex-col items-center justify-center">
                  <p className="text-xl font-semibold">
                    Image is not uploaded yet
                  </p>
                  <span className="text-sm font-medium">
                    Hint: You can upload under setting module from setting config
                    tab
                  </span>
                </div> */}

            </div>
          </div>
          {/* {notification && (
            <Notify
              isOpen
              setIsOpen={hideNotification}
              displayMessage={notification}
            />
          )} */}
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
