import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import assets from '../../../assets';
import FastSpinner from '../../../components/common/CustomSpinner';
import AlertBox from '../../../components/common/SnackBar';
import useAlert from '../../../hooks/alert.hook';
import { useAppSelector } from '../../../redux/redux-hooks';
import authService from '../../../services/auth.service';
import promiseHandler from '../../../utilities/promise-handler';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'email is required' })
    .email('email is invalid'),
});

type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

const formOptions = { resolver: zodResolver(forgotPasswordSchema) };

function ForgotPasswordPage() {
  const systemConfigData = useAppSelector(
    (state: any) => state.appState.systemConfig
  );
  const [isLoader, setIsLoader] = useState(false);
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordType>(formOptions);

  const onSubmit = async (data: ForgotPasswordType) => {
    setIsLoader(true);
    const forgotPasswordPromise = authService.forgotPassword(data);
    const [forgotPasswordResult, forgotPasswordError] = await promiseHandler(
      forgotPasswordPromise
    );
    if (!forgotPasswordResult) {
      setIsLoader(false);
      setAlertSeverity('error');
      setAlertMessage(forgotPasswordError.message);
      setShowAlert(true);
      return;
    }
    if (!forgotPasswordResult.data.success) {
      setIsLoader(false);
      setAlertSeverity('error');
      setAlertMessage(forgotPasswordResult.data.message);
      setShowAlert(true);
      return;
    }
    setAlertSeverity('success');
    setAlertMessage(forgotPasswordResult.data.message);
    setShowAlert(true);
    setIsLoader(false);
    setTimeout(() => {
      navigate('../otp-verification', { state: { email: data.email } });
    }, 500);
  };

  return (
    <>
      {/*      <AlertBox
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
      <div className="auth-form">
        <div className="custom-width">
          <h4 className="heading">Forgot Password</h4>
          <p className="desc">
            Enter registered email to receive password reset link
          </p>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'email is required' }}
            render={({ field }) => (
              <FormControl className="field mt-8 lg:mt-10" variant="standard">
                <InputLabel className="label" htmlFor={field.name}>
                  Email
                </InputLabel>
                <Input
                  type="email"
                  className="input-container"
                  id={field.name}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  ref={field.ref}
                  value={field.value}
                />
                {errors.email && (
                  <p className="font-open-sans text-xs text-red-500">
                    {errors.email.message?.toString()}
                  </p>
                )}
              </FormControl>
            )}
          />

          <button
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="btn-submit mt-8 lg:mt-10"
          >
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
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
      <div className="flex h-full w-full items-center justify-center bg-background">
        <div className="mx-auto  grid w-full grid-cols-12  items-center justify-around max-[1560px]:items-center">
          <div className="col-span-12  self-start  px-[30px] md:col-span-4 lg:col-span-4">
            <div className="flex max-h-[29px] w-full max-w-[600px] items-center justify-center px-[25px] py-[40px]">
              {systemConfigData?.tenantConfig?.logo ? (
                <img
                  // src={systemConfig?.shopLogo ?? systemConfig?.shopName}
                  src={systemConfigData.tenantConfig.logo}
                  alt="urlaundry"
                  className="mt-10 h-auto w-[100px] object-contain"
                />
              ) : (
                <span>Logo</span>
              )}
            </div>
            <div className="pt-[100px]">
              {/* <h1 className='text-[36px] text-black leading-[normal] font-bold capitalize mb-4 text-center'>log in</h1> */}
              <div className=" text-center">
                <img
                  src={assets.images.envelopeMsg}
                  alt="email"
                  className="h-[100[px] mx-auto w-[100px]"
                />
              </div>
              <div className="mt-2 ">
                <span className="block text-center text-[11px] font-normal leading-[normal] text-[#6A6A6A]">
                  Enter registered email
                </span>
                <span className="block text-center text-[11px] font-normal leading-[normal] text-[#6A6A6A]">
                  to receive password reset link
                </span>
                <div className="form-group mt-[42px]">
                  <span className="text-[11px] font-medium leading-[normal] text-[#06152B]">
                    Email
                  </span>

                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'email is required' }}
                    render={({ field }) => (
                      <FormControl className="my-1 w-full" variant="standard">
                        <Input
                          type="email"
                          placeholder="example@mail.com"
                          className="h-[30px] rounded-md border-[1px] border-solid border-[#949EAE] bg-white px-1 text-[11px]"
                          id={field.name}
                          name={field.name}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                          ref={field.ref}
                          value={field.value}
                          disableUnderline
                        />
                        {errors.email && (
                          <p className="my-[1px] font-open-sans text-[10px] text-red-500">
                            {errors.email.message?.toString()}
                          </p>
                        )}
                      </FormControl>
                    )}
                  />
                </div>

                <div className="w-full xl:mt-[60px] 2xl:mt-[100px] ">
                  <Button
                    disabled={isLoader}
                    className="btn-style w-full bg-primary px-16 py-2 text-gray-50"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    color="inherit"
                    title="get code"
                  >
                    {isLoader ? <FastSpinner /> : 'Get Code'}
                  </Button>
                </div>
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
    </>
  );
}

export default ForgotPasswordPage;
