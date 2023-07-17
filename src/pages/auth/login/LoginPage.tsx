import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import assets from '../../../assets';
import { useForm } from 'react-hook-form';
import { LoginPayload } from '../../../interfaces/auth.interface';
import { useAppDispatch } from '../../../redux/redux-hooks';
import authService from '../../../services/Auth';
import { login } from '../../../redux/features/authStateSlice';
import AlertBox from '../../../components/common/SnackBar';

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');
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
  const submitHandler = (data: LoginPayload) => {
    authService
      .LoginService(data)
      .then((response) => {
        if (response.data.success) {
          dispatch(login(response.data.data));
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        setShowAlert(true);
        setAlertMessage(err.message);
        setAlertSeverity('error');
      });
  };

  return (
    <>
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
              {...register('email', { required: true })}
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
              {...register('password', { required: true })}
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
          <button type="button" className="btn-login-fb">
            <img className="mr-2.5 w-2.5" src={assets.images.facebook} alt="" />
            Login with Facebook
          </button>
          <div className="login-other-options mt-8 lg:mt-10">
            <p className="text">
              Don't have an account yet ?
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
      </div>

      {showAlert && (
        <AlertBox
          alertOpen={showAlert}
          msg={alertMessage}
          setSeverty={alertSeverity}
          setAlertOpen={setShowAlert}
        />
      )}
    </>
  );
}

export default LoginPage;
