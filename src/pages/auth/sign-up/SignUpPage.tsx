import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import FastSpinner from '../../../components/common/CustomSpinner';
import AlertBox from '../../../components/common/SnackBar';
import useAlert from '../../../hooks/alert.hook';
import { useAppSelector } from '../../../redux/redux-hooks';
import authService from '../../../services/auth.service';
import { OTPPayload, SignUpPayload } from '../../../types/auth.types';
import { setSignUpData } from '../../../utilities/constant';
import promiseHandler from '../../../utilities/promise-handler';

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
  const [greeting, setGreeting] = useState('');
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
    navigate('../signup-otp-verification', { state: data.email });
  };

  const onsubmit = async (data: SignUpPayload) => {
    setSignUpData(data);
    const dataOtp = { email: data.email };
    await OtpVerification(dataOtp);
  };

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 0 && currentTime < 12) {
      setGreeting('Hey, morning!');
    } else {
      setGreeting('Hey, evening!');
    }
  }, []);

  return (
    <>
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
      <div className="flex w-full items-center justify-center bg-background xl:h-fit 2xl:h-full">
        <div className="mx-auto  grid w-full grid-cols-12  items-center justify-around max-[1560px]:items-center">
          <div className="col-span-12  self-start  px-[30px] md:col-span-4 lg:col-span-4">
            <div className="flex max-h-[29px] w-full max-w-[600px] items-center justify-center px-[25px] py-[40px]">
              {userData?.tenantConfig?.logo ? (
                <img
                  src={userData.tenantConfig.logo}
                  alt="urlaundry"
                  className="mt-10 h-auto w-[100px] object-contain"
                />
              ) : (
                <span>Logo</span>
              )}
            </div>
            <div className="xl:pt-[50px] 2xl:pt-[150px]">
              <div className="flex justify-center">
                {greeting === 'Hey, morning!' ? (
                  <img src={assets.images.morningImage} alt="morning" />
                ) : (
                  <img
                    height={80}
                    width={80}
                    src={assets.images.noonImage}
                    alt="evening"
                  />
                )}
              </div>
              <h1 className="mb-4 text-center text-[36px] font-bold capitalize leading-[normal] text-black">
                {greeting}
              </h1>
              <form>
                <div className="">
                  <div className="form-group w-full">
                    <span className="text-[11px] font-medium leading-[normal] text-[#06152B]">
                      First Name
                    </span>
                    <FormControl className="my-1 w-full" variant="standard">
                      <Input
                        disableUnderline
                        className="input-with-icon h-[30px] text-[11px]"
                        id="firstName"
                        type="firstName"
                        placeholder="john"
                        {...register('firstName', { required: true })}
                      />
                      {errors.firstName && (
                        <span className="my-[1px] text-[10px] text-red-500">
                          *First Name is required
                        </span>
                      )}
                    </FormControl>
                  </div>
                  <div className="form-group w-full">
                    <span className="text-[11px] font-medium leading-[normal] text-[#06152B]">
                      Last Name
                    </span>
                    <FormControl
                      className="my-1 w-full text-xs"
                      variant="standard"
                    >
                      <Input
                        disableUnderline
                        placeholder="martin"
                        className="input-with-icon h-[30px] text-[11px]"
                        id="lastName"
                        type="lastName"
                        {...register('lastName', { required: true })}
                      />
                      {errors.lastName && (
                        <span className="my-[1px] text-[10px] text-red-500">
                          *Last Name is required
                        </span>
                      )}
                    </FormControl>
                  </div>
                  <div className="form-group w-full">
                    <span className="text-[11px] font-medium leading-[normal] text-[#06152B]">
                      Phone Number
                    </span>
                    <FormControl
                      className="my-1 w-full text-xs"
                      variant="standard"
                    >
                      <Input
                        disableUnderline
                        className="input-with-icon h-[30px] text-[11px]"
                        id="phone"
                        type="phone"
                        placeholder="32234433"
                        {...register('phone', { required: true })}
                      />
                      {errors.phone && (
                        <span className="my-[1px] text-[10px] text-red-500">
                          *Phone Number is required
                        </span>
                      )}
                    </FormControl>
                  </div>
                  <div className="form-group w-full">
                    <span className="text-[11px] font-medium leading-[normal] text-[#06152B]">
                      Email
                    </span>
                    <FormControl
                      className="my-1 w-full text-xs"
                      variant="standard"
                    >
                      <Input
                        disableUnderline
                        className="input-with-icon h-[30px] text-[11px]"
                        id="email"
                        type="email"
                        placeholder="johnmartin@urapp.com"
                        {...register('email', { required: true })}
                      />
                      {errors.email && (
                        <span className="my-[1px] text-[10px] text-red-500">
                          *Email is required
                        </span>
                      )}
                    </FormControl>
                  </div>
                  <div className="form-group w-full">
                    <span className="text-[11px] font-medium leading-[normal] text-[#06152B]">
                      Password
                    </span>
                    <FormControl
                      className="my-1 w-full text-xs"
                      variant="filled"
                    >
                      <Input
                        disableUnderline
                        className="input-with-icon h-[30px] text-[11px] after:border-b-secondary"
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
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        {...register('password', { required: true })}
                      />
                      {errors.password && (
                        <span className="my-[1px] text-[10px] text-red-500">
                          *Password is required
                        </span>
                      )}
                    </FormControl>
                  </div>
                  <div className="form-group w-full">
                    <span className="text-[11px] font-medium leading-[normal] text-[#06152B]">
                      Postal Code
                    </span>
                    <FormControl
                      className="my-1 w-full text-xs"
                      variant="standard"
                    >
                      <Input
                        disableUnderline
                        placeholder="64500"
                        className="input-with-icon h-[30px] text-[11px]"
                        id="postalCode"
                        type="postalCode"
                        {...register('postalCode', { required: true })}
                      />
                      {errors.postalCode && (
                        <span className="my-[1px] text-[10px] text-red-500">
                          *Postal code is required
                        </span>
                      )}
                    </FormControl>
                  </div>
                  <div className="my-5 w-full">
                    <Button
                      disabled={!!isLoader}
                      className="btn-style w-full bg-primary px-16 py-2 text-sm text-gray-50"
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
          <div className=" col-span-12 px-3 py-10 md:col-span-8 md:py-2 lg:col-span-8">
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
