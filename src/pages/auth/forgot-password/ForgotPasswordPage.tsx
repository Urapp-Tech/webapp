import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { NavLink } from 'react-router-dom';
import assets from '../../../assets';

function ForgotPasswordPage() {
  return (
    <>
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
          <FormControl className="field mt-8 lg:mt-10" variant="standard">
            <InputLabel className="label" htmlFor="email">
              Email
            </InputLabel>
            <Input className="input-container" id="email" type="email" />
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
      </div>
    </>
  );
}

export default ForgotPasswordPage;
