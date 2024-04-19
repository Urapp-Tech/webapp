/* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable react/jsx-props-no-spreading */
// import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import FormControl from '@mui/material/FormControl';
// import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import InputAdornment from '@mui/material/InputAdornment';
// import InputLabel from '@mui/material/InputLabel';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { NavLink, useNavigate } from 'react-router-dom';
// import assets from '../../../assets';
// import AlertBox from '../../../components/common/SnackBar';
// import useAlert from '../../../hooks/alert.hook';
// import authService from '../../../services/auth.service';
// import { OTPPayload, SignUpPayload } from '../../../types/auth.types';
// import { setSignUpData } from '../../../utilities/constant';
// import promiseHandler from '../../../utilities/promise-handler';

// function SignUpPage() {
//   const {
//     alertMessage,
//     setAlertMessage,
//     showAlert,
//     setShowAlert,
//     alertSeverity,
//     setAlertSeverity,
//   } = useAlert();

//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignUpPayload>();
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     event.preventDefault();
//   };

//   const OtpVerification = async (data: OTPPayload) => {
//     const getOPTPromise = authService.getOTP(data);
//     const [getOPTResult, getOPTError] = await promiseHandler(getOPTPromise);
//     if (!getOPTResult) {
//       setShowAlert(true);
//       setAlertMessage(getOPTError.message);
//       setAlertSeverity('error');
//       return;
//     }
//     if (!getOPTResult.data.success) {
//       setShowAlert(true);
//       setAlertMessage(getOPTResult.data.message);
//       setAlertSeverity('error');
//       return;
//     }
//     navigate('../otp-verification');
//   };

//   const onsubmit = async (data: SignUpPayload) => {
//     setSignUpData(data);
//     const dataOtp = { email: data.email };
//     await OtpVerification(dataOtp);
//   };
//   return (
//     <div className="auth-main">
//       <AlertBox
//         msg={alertMessage}
//         setSeverity={alertSeverity}
//         alertOpen={showAlert}
//         setAlertOpen={setShowAlert}
//       />

//       <div className="fixed-at-top-left">
//         <NavLink to="../login" className="go-back">
//           <ArrowBackRoundedIcon className="icon-arrow" />
//         </NavLink>
//         <img className="logo" src={assets.images.logo} alt="" />
//       </div>
//       <div className="auth-form pt-12">
//         <div className="custom-width">
//           <h4 className="heading">Get Registered</h4>
//           <FormControl className="field mb-3 mt-4" variant="standard">
//             <InputLabel className="label" htmlFor="firstName">
//               First Name
//             </InputLabel>
//             <Input
//               className="input-container"
//               id="firstName"
//               type="firstName"
//               {...register('firstName', { required: true })}
//             />
//             {errors.firstName && (
//               <span className="text-red-500">First Name is required</span>
//             )}
//           </FormControl>
//           <FormControl className="field mb-3" variant="standard">
//             <InputLabel className="label" htmlFor="lastName">
//               Last Name
//             </InputLabel>
//             <Input
//               className="input-container"
//               id="lastName"
//               type="lastName"
//               {...register('lastName', { required: true })}
//             />
//             {errors.lastName && (
//               <span className="text-red-500">Last name is required</span>
//             )}
//           </FormControl>
//           <FormControl className="field mb-3" variant="standard">
//             <InputLabel className="label" htmlFor="phoneNumber">
//               Phone Number
//             </InputLabel>
//             <Input
//               className="input-container"
//               id="phoneNumber"
//               type="phoneNumber"
//               {...register('phone', { required: true })}
//             />
//             {errors.phone && (
//               <span className="text-red-500">Phone number is required</span>
//             )}
//           </FormControl>
//           <FormControl className="field mb-3" variant="standard">
//             <InputLabel className="label" htmlFor="email">
//               Email
//             </InputLabel>
//             <Input
//               className="input-container"
//               id="email"
//               type="email"
//               {...register('email', { required: true })}
//             />
//             {errors.email && (
//               <span className="text-red-500">Email is required</span>
//             )}
//           </FormControl>

//           <FormControl className="field mb-3" variant="standard">
//             <InputLabel className="label" htmlFor="password">
//               Password
//             </InputLabel>
//             <Input
//               className="input-container"
//               id="password"
//               type={showPassword ? 'text' : 'password'}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     className="field-icon"
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               {...register('password', { required: true })}
//             />
//             {errors.password && (
//               <span className="text-red-500">Password is required</span>
//             )}
//           </FormControl>
//           <FormControl className="field mb-3" variant="standard">
//             <InputLabel className="label" htmlFor="postalCode">
//               Postal Code
//             </InputLabel>
//             <Input
//               className="input-container"
//               id="postalCode"
//               type="postalCode"
//               {...register('postalCode', { required: true })}
//             />
//             {errors.postalCode && (
//               <span className="text-red-500">Postal code is required</span>
//             )}
//           </FormControl>

//           <div className="t-n-c">
//             By Signing up. you accept our &nbsp;
//             <NavLink to="../login">Terms and Conditions &nbsp;</NavLink>
//             and &nbsp;
//             <NavLink to="../login">Privacy Policy</NavLink>
//           </div>
//           <button
//             type="button"
//             className="btn-submit mt-5"
//             onClick={handleSubmit(onsubmit)}
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>

//       <div className="join-community register-community">
//         <div className="content-container">
//           <div className="content">
//             <h1 className="heading">Join Our Community</h1>
//             <p className="desc">
//               Lorem ipusm dolor sit amet, coectetuer adipiscing elit sed diam
//               nonummy et nibh euismod
//             </p>
//           </div>
//           <img className="" src={assets.images.registerImage} alt="" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUpPage;
// eslint-disable-next-line react/jsx-props-no-spreading
import FacebookLogin, {
  SuccessResponse,
} from '@greatsumini/react-facebook-login';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import AlertBox from '../../../components/common/SnackBar';
import useAlert from '../../../hooks/alert.hook';
import { setSignUpData } from '../../../utilities/constant';
import { setUserAddressList } from '../../../redux/features/deviceState';
import { useAppDispatch, useAppSelector } from '../../../redux/redux-hooks';
import addressService from '../../../services/address.service';
import authService from '../../../services/auth.service';
import { OTPPayload, SignUpPayload } from '../../../types/auth.types';
import promiseHandler from '../../../utilities/promise-handler';
import Loader from '../../../components/common/Loader';
import FastSpinner from '../../../components/common/CustomSpinner';

function LoginPage() {
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();
  const [isLoader, setIsLoader] = useState(false);
  const cartItem = useAppSelector((state: any) => state.cartState.cartItems);
  const userData = useAppSelector((state: any) => state.appState.systemConfig);
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
    setIsLoader(true);
    const getOPTPromise = authService.getOTP(data);
    const [getOPTResult, getOPTError] = await promiseHandler(getOPTPromise);
    if (!getOPTResult) {
      setIsLoader(false);
      setShowAlert(true);
      setAlertMessage(getOPTError.message);
      setAlertSeverity('error');
      return;
    }
    if (!getOPTResult.data.success) {
      setIsLoader(false);
      setShowAlert(true);
      setAlertMessage(getOPTResult.data.message);
      setAlertSeverity('error');
      return;
    }
    setIsLoader(false);
    navigate('../otp-verification', { state: data.email });
  };

  const onsubmit = async (data: SignUpPayload) => {
    setSignUpData(data);
    const dataOtp = { email: data.email };
    await OtpVerification(dataOtp);
  };

  return (
    <>
      {/* <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
      <div className="fixed-at-top-left">
        <img className="logo" src={assets.images.logo} alt="" />
      </div>
      <div className="auth-form">
        <div className="custom-width">
          <h4 className="heading">Sign in to Customer</h4>
          <FormControl className="field mt-8 lg:mt-10" variant="standard">
            <InputLabel className="label" htmlFor="email">
              Email
            </InputLabel>
            <Input
              className="input-container"
              id="email"
              type="email"
              onChange={email.onChange}
              onBlur={email.onBlur}
              name={email.name}
              ref={email.ref}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </FormControl>

          <FormControl className="field" variant="standard">
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
              onChange={password.onChange}
              onBlur={password.onBlur}
              name={password.name}
              ref={password.ref}
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </FormControl>

          <div className="mt-2 flex items-center justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  className="checkbox"
                  id="remember-me"
                  name="remember-me"
                />
              }
              label="Remember me"
              className="remember-me"
            />
            <NavLink className="forgot-pass-link" to="../forgot-password">
              Forgot Password ?
            </NavLink>
          </div>
          <button
            type="button"
            onClick={handleSubmit(submitHandler)}
            className="btn-submit mt-8 lg:mt-10"
          >
            Login
          </button>
          <FacebookLogin
            appId="246641688446576"
            onSuccess={handleLoginWithFacebook}
            render={({ onClick }) => (
              <button onClick={onClick} type="button" className="btn-login-fb">
                <img
                  className="mr-2.5 w-2.5"
                  src={assets.images.facebook}
                  alt=""
                />
                Login with Facebook
              </button>
            )}
          />

          <div className="login-other-options mt-8 lg:mt-10">
            <p className="text">
              Don&apos;t have an account yet ?
              <NavLink className="signup-link" to="../sign-up">
                Sign Up
              </NavLink>
            </p>
          </div>
        </div>
      </div>

      <div className="join-community login-community">
        <div className="content-container">
          <div className="content">
            <h1 className="heading">Join Our Community</h1>
            <p className="desc">
              Lorem ipusm dolor sit amet, coectetuer adipiscing elit sed diam
              nonummy et nibh euismod
            </p>
          </div>
          <img className="" src={assets.images.loginImage} alt="" />
        </div>
      </div> */}
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
      <div className="flex h-full w-full items-center justify-center bg-[#F0F0F0]">
        <div className="mx-auto  flex w-full  items-center justify-around max-[1560px]:items-center">
          <div className="w-[30%]  self-start px-[30px]">
            <div className="max-h-[29px] w-full max-w-[150px] px-[25px] py-[40px]">
              {userData?.tenantConfig?.logo ? (
                <img
                  // src={systemConfig?.shopLogo ?? systemConfig?.shopName}
                  src={userData.tenantConfig.logo}
                  alt="urlaundry"
                  className="h-auto w-full object-contain"
                />
              ) : (
                <span>Logo</span>
              )}
            </div>
            <div className="xl:pt-[100px] 2xl:pt-[150px]">
              <h1 className="mb-4 text-center text-[36px] font-bold capitalize leading-[normal] text-black">
                Sign up
              </h1>
              <form>
                <div className="">
                  <div className="form-group w-full">
                    <span className="text-[14px] font-medium leading-[normal] text-[#06152B]">
                      First Name
                    </span>
                    <FormControl
                      className="my-1 w-full text-xs"
                      variant="standard"
                    >
                      <Input
                        disableUnderline
                        className="input-with-icon"
                        id="firstName"
                        type="firstName"
                        placeholder="john"
                        {...register('firstName', { required: true })}
                      />
                      {errors.firstName && (
                        <span className="text-red-500">
                          First Name is required
                        </span>
                      )}
                    </FormControl>
                  </div>
                  <div className="form-group w-full">
                    <span className="text-[14px] font-medium leading-[normal] text-[#06152B]">
                      Last Name
                    </span>
                    <FormControl
                      className="my-1 w-full text-xs"
                      variant="standard"
                    >
                      <Input
                        disableUnderline
                        placeholder="martin"
                        className="input-with-icon"
                        id="lastName"
                        type="lastName"
                        {...register('lastName', { required: true })}
                      />
                      {errors.lastName && (
                        <span className="text-red-500">
                          Last Name is required
                        </span>
                      )}
                    </FormControl>
                  </div>
                  <div className="form-group w-full">
                    <span className="text-[14px] font-medium leading-[normal] text-[#06152B]">
                      Phone Number
                    </span>
                    <FormControl
                      className="my-1 w-full text-xs"
                      variant="standard"
                    >
                      <Input
                        disableUnderline
                        className="input-with-icon"
                        id="phone"
                        type="phone"
                        placeholder="32234433"
                        {...register('phone', { required: true })}
                      />
                      {errors.phone && (
                        <span className="text-red-500">
                          Phone Number is required
                        </span>
                      )}
                    </FormControl>
                  </div>
                  <div className="form-group w-full">
                    <span className="text-[14px] font-medium leading-[normal] text-[#06152B]">
                      Email
                    </span>
                    <FormControl
                      className="my-1 w-full text-xs"
                      variant="standard"
                    >
                      <Input
                        disableUnderline
                        className="input-with-icon"
                        id="email"
                        type="email"
                        placeholder="johnmartin@urapp.com"
                        {...register('email', { required: true })}
                      />
                      {errors.email && (
                        <span className="text-red-500">Email is required</span>
                      )}
                    </FormControl>
                  </div>
                  <div className="form-group w-full">
                    <span className="text-[14px] font-medium leading-[normal] text-[#06152B]">
                      Password
                    </span>
                    <FormControl
                      className="my-1 w-full text-xs"
                      variant="filled"
                    >
                      <Input
                        disableUnderline
                        className="input-with-icon after:border-b-secondary"
                        id="password"
                        placeholder="*******"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              className="field-icon"
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        {...register('password', { required: true })}
                      />
                      {errors.password && (
                        <span className="text-red-500">
                          Password is required
                        </span>
                      )}
                    </FormControl>
                  </div>
                  <div className="form-group w-full">
                    <span className="text-[14px] font-medium leading-[normal] text-[#06152B]">
                      Postal Code
                    </span>
                    <FormControl
                      className="my-1 w-full text-xs"
                      variant="standard"
                    >
                      <Input
                        disableUnderline
                        placeholder="64500"
                        className="input-with-icon"
                        id="postalCode"
                        type="postalCode"
                        {...register('postalCode', { required: true })}
                      />
                      {errors.postalCode && (
                        <span className="text-red-500">
                          Postal code is required
                        </span>
                      )}
                    </FormControl>
                  </div>
                  <div className="mt-5 w-full">
                    <Button
                      disabled={!!isLoader}
                      className="w-full bg-neutral-900 px-16 py-2 text-sm text-gray-50"
                      variant="contained"
                      color="inherit"
                      title="Sign up"
                      onClick={handleSubmit(onsubmit)}
                    >
                      {isLoader ? <FastSpinner /> : 'Sign up'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-[70%] px-3 py-2">
            {/* <div className="mx-auto max-w-[800px] overflow-hidden rounded-lg flex justify-center items-center min-h-[800px] min-[1600px]:max-w-[934px] "> */}
            <div className="mx-auto  flex max-h-[834px] items-center justify-center overflow-hidden rounded-lg max-[1560px]:max-h-[96vh]">
              {userData?.logoffImage ? (
                <img
                  src={userData?.logoffImage || assets.images.bgLogin}
                  alt="urlaundry"
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-xl font-semibold">
                    Image is not uploaded yet
                  </p>
                </div>
              )}
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

export default LoginPage;
