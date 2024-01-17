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
      </div>
    </>
  );
}

export default ForgotPasswordPage;
