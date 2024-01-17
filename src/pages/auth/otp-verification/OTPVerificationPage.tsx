import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import dayjs from 'dayjs';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import OTPInput from 'react18-otp-input';
import assets from '../../../assets';
import { login } from '../../../redux/features/authStateSlice';
import { useAppDispatch } from '../../../redux/redux-hooks';
import authService from '../../../services/auth.service';
import { tenantId } from '../../../utilities/constant';
import { getItem, removeItem } from '../../../utilities/local-storage';
import promiseHandler from '../../../utilities/promise-handler';

function OTPVerificationPage() {
  const [OTP, setOTP] = useState('');
  const signUpData = getItem<any>('SIGN_UP_DATA');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onsubmit = async () => {
    const code = Object.assign(signUpData, {
      otp: OTP,
      tenant: tenantId,
      createdDate: dayjs().format(),
      updatedDate: dayjs().format(),
    });
    const signUpPromise = authService.signUp(code);
    const [signUpResult, signUpError] = await promiseHandler(signUpPromise);
    removeItem('SIGN_UP_DATA');
    if (!signUpResult) {
      console.error('error :>> ', signUpError.message);
      return;
    }
    if (!signUpResult.data.success) {
      console.error('error :>> ', signUpResult.data.message);
      return;
    }
    dispatch(login(signUpResult.data.data));
    navigate('../../dashboard/home');
  };

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
          <h4 className="heading">OTP Verification</h4>
          <p className="desc">
            An 4 digit code has been sent to Vincent-bo@gmail.com
          </p>
          <OTPInput
            containerStyle="otp-container"
            inputStyle={{
              width: '3rem',
              aspectRatio: '1/1',
              borderRadius: '0.625rem',
              outlineStyle: 'solid',
              outlineWidth: '1px',
              outlineColor: '#e5e5e5',
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
          <button
            type="button"
            className="btn-submit mt-8 lg:mt-10"
            onClick={() => onsubmit()}
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

export default OTPVerificationPage;
