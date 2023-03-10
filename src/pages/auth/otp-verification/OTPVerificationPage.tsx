import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import OTPInput from 'react18-otp-input';
import assets from '../../../assets';

function OTPVerificationPage() {
  const [OTP, setOTP] = useState('');

  return (
    <div className="relative h-full w-full">
      <NavLink
        to="../login"
        className="absolute left-20 top-16 flex aspect-square w-8 items-center justify-center rounded-full border-2 border-solid border-zinc-900 text-zinc-900"
      >
        <ArrowBackRoundedIcon className="m-0 p-0" />
      </NavLink>

      <div className="mx-auto flex h-full w-2/5 flex-col items-center justify-center gap-8">
        <img src={assets.images.logoBlack} alt="" />
        <div className="w-full text-center font-open-sans text-xl font-semibold text-zinc-900">
          OTP Verification
        </div>

        <OTPInput
          containerStyle="flex items-center gap-4"
          inputStyle={{
            width: '3.5rem',
            aspectRatio: '1/1',
            borderRadius: '0.75rem',
            outlineStyle: 'solid',
            outlineWidth: '2px',
            outlineColor: '#e5e5e5',
            fontFamily: 'Open Sans',
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
            fontWeight: 600,
            color: '#18181b',
          }}
          focusStyle={{ outlineColor: '#18181b' }}
          numInputs={4}
          onChange={(value: string) => setOTP(value)}
          separator={<span> </span>}
          isInputNum
          shouldAutoFocus
          value={OTP}
        />
        <div className="w-full text-center font-open-sans text-sm font-normal text-neutral-500">
          An 4 digit code has been sent to Vincent-bo@gmail.com
        </div>

        <button
          type="button"
          className="w-full rounded-xl bg-stone-900 py-2 font-open-sans text-base font-semibold text-gray-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default OTPVerificationPage;
