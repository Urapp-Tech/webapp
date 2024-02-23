import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as z from 'zod';
import assets from '../../../assets';
import AlertBox from '../../../components/common/SnackBar';
import useAlert from '../../../hooks/alert.hook';
import authService from '../../../services/auth.service';
import promiseHandler from '../../../utilities/promise-handler';
import { Button } from '@mui/material';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'email is required' })
    .email('email is invalid'),
});

type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

const formOptions = { resolver: zodResolver(forgotPasswordSchema) };

function ForgotPasswordPage() {
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordType>(formOptions);

  const onSubmit = async (data: ForgotPasswordType) => {
    const forgotPasswordPromise = authService.forgotPassword(data);
    const [forgotPasswordResult, forgotPasswordError] = await promiseHandler(
      forgotPasswordPromise
    );
    if (!forgotPasswordResult) {
      setAlertSeverity('error');
      setAlertMessage(forgotPasswordError.message);
      setShowAlert(true);
      return;
    }
    if (!forgotPasswordResult.data.success) {
      setAlertSeverity('error');
      setAlertMessage(forgotPasswordResult.data.message);
      setShowAlert(true);
      return;
    }
    setAlertSeverity('success');
    setAlertMessage(forgotPasswordResult.data.message);
    setShowAlert(true);
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
                </div>*/}
      <div className="flex h-full w-full items-center justify-center bg-[#F0F0F0]">
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
              {/* <h1 className='text-[36px] text-black leading-[normal] font-bold capitalize mb-4 text-center'>log in</h1> */}
              <div className=" text-center">
                <img
                  src={assets.images.envelopeMsg}
                  alt="email"
                  className="h-[100[px] mx-auto w-[100px]"
                />
              </div>
              <div className="mt-2 ">
                <span className="block text-center text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
                  Enter registered email
                </span>
                <span className="block text-center text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
                  to receive password reset link
                </span>
                <div className="form-group mt-[42px]">
                  <span className='text-[14px] font-medium leading-[normal] text-[#06152B]'>Email</span>
                    
                
                  <FormControl className="my-2 w-full" variant="standard">
                    <Input
                      className="border-[1px] border-solid border-[#949EAE] bg-white px-1 rounded-md text-[14px]"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="haris@urlaundry.com"
                      disableUnderline
                    />
                  </FormControl>
                </div>

                <div className="xl:mt-[60px] 2xl:mt-[100px] w-full ">
                  <Button
                    className="w-full bg-neutral-900 px-16 py-2 text-gray-50"
                    variant="contained"
                    color="inherit"
                    title="get code"
                  >
                    Get Code
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

export default ForgotPasswordPage;
