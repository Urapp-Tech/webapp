import { NavLink } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import assets from '../../../assets';

function ForgotPasswordPage() {
  return (
    <div className="relative h-full w-full">
      <NavLink
        to="../login"
        className="absolute left-20 top-16 flex aspect-square w-8 items-center justify-center rounded-full border-2 border-solid border-neutral-900 text-neutral-900"
      >
        <ArrowBackRoundedIcon className="m-0 p-0" />
      </NavLink>

      <div className="mx-auto flex h-full w-2/5 flex-col items-center justify-center gap-8">
        <img src={assets.images.logoBlack} alt="" />
        <div className="w-full text-center font-open-sans text-xl font-semibold text-neutral-900">
          Forgot Password
        </div>
        <div className="w-full text-center font-open-sans text-sm font-normal text-neutral-500">
          Enter registered email to receive password reset link
        </div>
        <FormControl className="m-1 w-full" variant="standard">
          <InputLabel className="text-neutral-900" htmlFor="email">
            Email
          </InputLabel>
          <Input
            className="after:border-b-neutral-900"
            id="email"
            type="email"
          />
        </FormControl>
        <button
          type="button"
          className="w-full rounded-xl bg-neutral-900 py-2 font-open-sans text-base font-semibold text-gray-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
