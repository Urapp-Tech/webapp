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
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import AlertBox from '../../../components/common/SnackBar';
import useAlert from '../../../hooks/alert.hook';
import { login } from '../../../redux/features/authStateSlice';
import { setUserAddressList } from '../../../redux/features/deviceState';
import { useAppDispatch, useAppSelector } from '../../../redux/redux-hooks';
import addressService from '../../../services/address.service';
import authService from '../../../services/auth.service';
import { LoginPayload } from '../../../types/auth.types';
import promiseHandler from '../../../utilities/promise-handler';
import Button from '@mui/material/Button';

function LoginPage() {
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const cartItem = useAppSelector((state: any) => state.cartState.cartItems);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const handleLoginWithFacebook = async (response: SuccessResponse) => {
    const loginPromise = authService.loginWithFacebook({
      accessToken: response.accessToken,
    });
    const [loginResponse, loginError] = await promiseHandler(loginPromise);
    if (!loginResponse) {
      setAlertSeverity('error');
      setAlertMessage(loginError.message);
      setShowAlert(true);
      return;
    }
    if (!loginResponse.data.success) {
      setAlertSeverity('error');
      setAlertMessage(loginResponse.data.message);
      setShowAlert(true);
      return;
    }
    dispatch(login(loginResponse.data.data));
    if (cartItem > 0) {
      navigate('/dashboard/my-basket');
    } else {
      navigate('/dashboard/home');
    }
    const addressPromise = addressService.getUserAddress();
    const [addressResult, addressError] = await promiseHandler(addressPromise);
    if (!addressResult) {
      setAlertSeverity('error');
      setAlertMessage(addressError.message);
      setShowAlert(true);
      return;
    }
    if (!addressResult.data.success) {
      setAlertSeverity('error');
      setAlertMessage(addressResult.data.message);
      setShowAlert(true);
      return;
    }
    dispatch(setUserAddressList(addressResult.data.data));
  };

  const email = register('email');
  const password = register('password');

  const submitHandler = async (data: LoginPayload) => {
    const loginPromise = authService.loginService(data);
    const [loginResponse, loginError] = await promiseHandler(loginPromise);
    if (!loginResponse) {
      setAlertSeverity('error');
      setAlertMessage(loginError.message);
      setShowAlert(true);
      return;
    }
    if (!loginResponse.data.success) {
      setAlertSeverity('error');
      setAlertMessage(loginResponse.data.message);
      setShowAlert(true);
      return;
    }
    dispatch(login(loginResponse.data.data));
    if (cartItem > 0) {
      navigate('/dashboard/my-basket');
    } else {
      navigate('/dashboard/home');
    }
    const addressPromise = addressService.getUserAddress();
    const [addressResult, addressError] = await promiseHandler(addressPromise);
    if (!addressResult) {
      setAlertSeverity('error');
      setAlertMessage(addressError.message);
      setShowAlert(true);
      return;
    }
    if (!addressResult.data.success) {
      setAlertSeverity('error');
      setAlertMessage(addressResult.data.message);
      setShowAlert(true);
      return;
    }
    dispatch(setUserAddressList(addressResult.data.data));
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
      <div className="flex  h-full w-full items-center justify-center bg-[#F0F0F0]">
        <div className="mx-auto  flex w-full  items-center justify-around max-[1560px]:items-center">
          <div className="w-[30%]  self-start px-[30px]">
            <div className="max-h-[29px] w-full max-w-[150px] px-[25px] py-[40px]">
              <img
                // src={systemConfig?.shopLogo ?? systemConfig?.shopName}
                src={assets.images.logo}
                alt="urlaundry"
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="pt-[150px]">
              <h1 className="mb-4 text-center text-[36px] font-bold capitalize leading-[normal] text-black">
                log in
              </h1>
              <form
                // onSubmit={handleSubmit(loginHandler)}
              >
                <div className="">
                  <div className="form-group w-full">
                    <span className='text-[14px] font-medium leading-[normal] text-[#06152B]'>
                      Email
                    </span>
                    <FormControl className="my-1 w-full" variant="standard">
                      <Input
                        className="input-with-icon"
                        id="email"
                        type="email"
                        {...register('email', {
                          required: 'Please enter your email.',
                        })}
                        disableUnderline
                      />
                      {/* {errors.email && (
                        <ErrorSpanBox error={errors.email?.message} />
                      )} */}
                    </FormControl>
                  </div>
                  <div className="form-group w-full">
                  <span className='text-[14px] font-medium leading-[normal] text-[#06152B]'>Password</span>
                    <FormControl className="my-1 w-full" variant="filled">
                      <Input
                        className="input-with-icon after:border-b-secondary"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                          required: 'Please enter your password.',
                        })}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        disableUnderline
                      />
                      {/* {errors.password && (
                        <ErrorSpanBox error={errors.password?.message} />
                      )} */}
                    </FormControl>
                  </div>
                  <div className="form-group text-end mt-1">
                    <NavLink
                      className="text-[14px] font-medium leading-[normal] text-[#06152B] "
                      to="../forgot-password"
                    >
                      Forget Password?
                    </NavLink>
                  </div>
                  <div className="mt-8 w-full ">
                    <Button
                      // disabled={!!isLoader}
                      className="w-full bg-neutral-900 px-16 py-2 text-gray-50"
                      variant="contained"
                      color="inherit"
                      title="Login"
                      type="submit"
                    >
                      Login
                      {/* {!isLoader ? (
                        `Login`
                      ) : (
                        <CircularProgress color="inherit" size={24} />
                      )} */}
                    </Button>
                  </div>
                </div>
              </form>
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

export default LoginPage;
