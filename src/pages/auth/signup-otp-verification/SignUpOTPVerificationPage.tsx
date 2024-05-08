import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OTPInput from 'react18-otp-input';
import assets from '../../../assets';
import { login } from '../../../redux/features/authStateSlice';
import { useAppDispatch } from '../../../redux/redux-hooks';
import authService from '../../../services/auth.service';
import { getTenantId } from '../../../utilities/constant';
import { getItem, removeItem } from '../../../utilities/local-storage';
import promiseHandler from '../../../utilities/promise-handler';
import FastSpinner from '../../../components/common/CustomSpinner';

function SignUpOTPVerificationPage() {
  const location = useLocation();
  const state = location;
  const [OTP, setOTP] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const signUpData = getItem<any>('SIGN_UP_DATA');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onsubmit = async () => {
    setIsLoader(true);
    const code = Object.assign(signUpData, {
      otp: OTP,
      tenant: getTenantId(),
      createdDate: dayjs().format(),
      updatedDate: dayjs().format(),
    });
    const signUpPromise = authService.signUp(code);
    const [signUpResult, signUpError] = await promiseHandler(signUpPromise);
    removeItem('SIGN_UP_DATA');
    if (!signUpResult) {
      setIsLoader(false);
      console.error('error :>> ', signUpError.message);
      return;
    }
    if (!signUpResult.data.success) {
      setIsLoader(false);
      console.error('error :>> ', signUpResult.data.message);
      return;
    }
    dispatch(login(signUpResult.data.data));
    navigate('../../dashboard/home');
    setIsLoader(false);
  };
  console.log('email', state);

  return (
    <>
      {/* <div className="fixed-at-top-left">
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
      </div> */}
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
                  src={assets.images.otpMSg}
                  alt="email"
                  className="mx-auto h-[80px] w-[80px]"
                />
              </div>
              <div className="mt-2 ">
                <span className="block text-center text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
                  An 4 digit code has been sent to
                </span>
                <span className="block text-center text-[14px] font-medium leading-[normal] text-[#6A6A6A]">
                  {state.state ?? ''}
                </span>
                <div className="mt-[42px] flex w-full items-center justify-center text-center">
                  <OTPInput
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
                <div className="mt-[100px] w-full">
                  <Button
                    className="w-full rounded-[10px] bg-neutral-900 px-16 py-2 text-gray-50"
                    variant="contained"
                    color="inherit"
                    title="get code"
                    onClick={() => onsubmit()}
                  >
                    {isLoader ? <FastSpinner /> : 'Submit'}
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

export default SignUpOTPVerificationPage;
