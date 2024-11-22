/* eslint-disable jsx-a11y/label-has-associated-control */
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import OtpInput from 'react18-otp-input';
import assets from '../../../assets';
import FastSpinner from '../../../components/common/CustomSpinner';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import AlertBox from '../../../components/common/SnackBar';
import useAlert from '../../../hooks/alert.hook';
import { useAppSelector } from '../../../redux/redux-hooks';
import authService from '../../../services/auth.service';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
} from '../../../utilities/constant';

type Pass = {
  newPassword: string;
  reNewPassword: string;
};

function OTPVerificationPage() {
  const navigate = useNavigate();

  const [OTP, setOTP] = useState('');
  const location = useLocation();
  const { state } = location;
  const [isLoader, setIsLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const systemConfigData = useAppSelector(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (state: any) => state.appState.systemConfig
  );
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () =>
    setShowNewPassword((newShow) => !newShow);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Pass>();

  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const submitHandler = (data: Pass) => {
    setIsLoader(true);
    const newPassObj = {
      password: data.newPassword,
      email: state?.email,
      otp: OTP,
    };
    authService
      .resetPassword(newPassObj)
      .then((res) => {
        if (res.data.success) {
          setIsLoader(false);
          setTimeout(() => {
            setAlertSeverity('success');
            setAlertMessage(res.data.message);
            setShowAlert(true);
            navigate('../login', { replace: true });
          }, 500);
        } else {
          setIsLoader(false);
          setAlertSeverity('error');
          setShowAlert(true);

          setAlertMessage(res.data.message);
        }
      })
      .catch((err: Error) => {
        setIsLoader(false);
        setAlertSeverity('error');
        setAlertMessage(err.message);
        setShowAlert(true);
      });
  };

  return (
    <>
      <div className="flex w-full items-center justify-center bg-background xl:h-fit 2xl:h-full">
        <div className="mx-auto  grid w-full grid-cols-12  items-center justify-around max-[1560px]:items-center">
          <div className="col-span-12  self-start  px-[30px] md:col-span-4 lg:col-span-4">
            <div className="flex max-h-[29px] w-full max-w-[600px] items-center justify-center px-[25px] py-[40px]">
              {systemConfigData?.tenantConfig?.logo ? (
                <img
                  src={systemConfigData.tenantConfig.logo}
                  alt="urlaundry"
                  className="mt-10 h-auto w-[100px] object-contain"
                />
              ) : (
                <span>Logo</span>
              )}
            </div>
            <div className="pt-[50px]">
              <div className=" text-center">
                <img
                  src={assets.images.otpMSg}
                  alt="email"
                  className="mx-auto h-[80px] w-[80px]"
                />
              </div>
              <div className="mt-2 ">
                <span className="block text-center text-[11px] font-normal leading-[normal] text-[#6A6A6A]">
                  An 4 digit code has been sent to
                </span>
                <span className="block text-center text-[12px] font-semibold leading-[normal] text-[#6A6A6A]">
                  {state?.email}
                </span>
                <span className="mx-10 mt-2 block text-center text-[11px] font-normal leading-[normal] text-[#6A6A6A]">
                  Note : Please check your email for the OTP code and paste it
                  here; otherwise, it will expire within an hour.
                </span>
                <div className="mt-[30px] flex w-full items-center justify-center text-center">
                  <OtpInput
                    placeholder="1234"
                    className="mx-2"
                    containerStyle="otp-container"
                    inputStyle={{
                      width: '3rem',
                      aspectRatio: '1/1',
                      borderRadius: '0.625rem',
                      outlineStyle: 'solid',
                      outlineWidth: '1px',
                      outlineColor: '#E5E5E5',
                      fontFamily: 'Open Sans',
                      fontSize: '1.25rem',
                      lineHeight: '1.5rem',
                      fontWeight: 600,
                      color: '#000000',
                    }}
                    focusStyle={{ outlineColor: '#000000' }}
                    numInputs={4}
                    onChange={(value: string) => setOTP(value)}
                    separator={<span> </span>}
                    isInputNum
                    shouldAutoFocus
                    value={OTP}
                  />
                </div>
                {OTP?.length > 3 && (
                  <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="flex flex-col">
                      <FormControl className="FormControl" variant="standard">
                        <div className="form-group mt-[20px] w-full">
                          <label
                            htmlFor="email"
                            className="text-[11px] font-normal leading-[normal] text-[#06152B]"
                          >
                            New Password
                          </label>
                          <br />
                          <Input
                            style={{ paddingRight: '0' }}
                            className="input-with-icon my-1 h-[30px] w-full px-4 text-[11px] after:border-b-neutral-900"
                            id="password"
                            placeholder="********"
                            autoComplete="new-password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('newPassword', {
                              required: 'Password is required',
                              pattern: PATTERN.PASSWORD,
                              validate: (value) => value.length <= 150,
                            })}
                            endAdornment={
                              <InputAdornment position="end" className="mx-2">
                                <IconButton
                                  style={{ padding: 0 }}
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            disableUnderline
                          />
                          {errors.newPassword?.type === 'required' && (
                            <ErrorSpanBox error={errors.newPassword?.message} />
                          )}
                          {errors.newPassword?.type === 'pattern' && (
                            <ErrorSpanBox error={INVALID_CHAR} />
                          )}
                          {errors.newPassword?.type === 'validate' && (
                            <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                          )}
                        </div>
                      </FormControl>
                      <FormControl className="FormControl" variant="standard">
                        <div className="form-group w-full">
                          <label
                            htmlFor="email"
                            className="text-[11px] font-normal leading-[normal] text-[#06152B]"
                          >
                            Confirm New Password
                          </label>
                          <br />
                          <Input
                            style={{ paddingRight: '0' }}
                            className="input-with-icon my-1 h-[30px] w-full px-4 text-[11px] after:border-b-neutral-900"
                            id="reNewPassword"
                            placeholder="********"
                            autoComplete="new-password"
                            type={showNewPassword ? 'text' : 'password'}
                            {...register('reNewPassword', {
                              required: 'Confirm Password is required',
                              pattern: PATTERN.PASSWORD,
                              validate: {
                                maxlength: (value) =>
                                  value.length <= 100 || MAX_LENGTH_EXCEEDED,
                                matchesPrevious: (value) =>
                                  value === watch('newPassword') ||
                                  'Passwords do not match',
                              },
                            })}
                            endAdornment={
                              <InputAdornment position="end" className="mx-2">
                                <IconButton
                                  style={{ padding: 0 }}
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowNewPassword}
                                >
                                  {showNewPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            disableUnderline
                          />
                          {errors.reNewPassword?.type === 'required' && (
                            <ErrorSpanBox
                              error={errors.reNewPassword?.message}
                            />
                          )}
                          {errors.reNewPassword?.type === 'pattern' && (
                            <ErrorSpanBox error={INVALID_CHAR} />
                          )}
                          {(errors.reNewPassword?.type === 'matchesPrevious' ||
                            errors.reNewPassword?.type === 'maxlength') && (
                            <ErrorSpanBox
                              error={errors.reNewPassword?.message}
                            />
                          )}
                        </div>
                      </FormControl>
                    </div>
                    <div className="mt-[10px] w-full px-4 py-4">
                      <Button
                        disabled={isLoader}
                        className="w-full rounded-[10px] bg-primary px-16 py-2 text-gray-50"
                        variant="contained"
                        color="inherit"
                        title="Submit"
                        type="submit"
                      >
                        {isLoader ? <FastSpinner /> : 'Submit'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-12 px-3 py-10 md:col-span-8 md:py-2 lg:col-span-8">
            <div className="mx-auto  flex max-h-[834px] items-center justify-center overflow-hidden rounded-lg max-[1560px]:max-h-[96vh]">
              {systemConfigData?.logoffImage ? (
                <img
                  src={systemConfigData?.logoffImage || assets.images.bgLogin}
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
        </div>
      </div>
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
    </>
  );
}

export default OTPVerificationPage;
