import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import assets from '../../assets';

type PaymentOptions = 'MASTER_CARD' | 'PAYPAL' | 'CASH';

function genButtonClasses(isActive: boolean) {
  const classes =
    'relative flex w-full items-center rounded-xl bg-gray-50 p-4 shadow-md';
  if (isActive) {
    return `${classes} outline outline-2 outline-neutral-900`;
  }
  return classes;
}

function PaymentSettingPage() {
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<PaymentOptions>('MASTER_CARD');
  return (
    <div className="container px-5 py-5">
      <div className="font-open-sans text-3xl font-semibold text-neutral-900">
        Payment Setting
      </div>
      <div className="mt-4 mb-8 grid grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] gap-4">
        <button
          type="button"
          onClick={() => setSelectedPaymentOption('MASTER_CARD')}
          className={genButtonClasses(selectedPaymentOption === 'MASTER_CARD')}
        >
          {selectedPaymentOption === 'MASTER_CARD' ? (
            <div className="absolute -bottom-3 left-[calc(75%_+_1rem)] z-10 aspect-square w-5 rotate-45 border-2 border-t-0 border-l-0 border-solid border-neutral-900 bg-gray-50" />
          ) : null}
          <img
            src={assets.images.mastercard}
            className="mr-4 aspect-square w-10 object-contain"
            alt=""
          />
          <div className="flex-grow text-start">
            <div className="font-open-sans text-base font-semibold text-neutral-900">
              **** **** **** 3802
            </div>
            <div className="font-open-sans text-sm font-normal text-neutral-500">
              Expires 10/27
            </div>
          </div>
          {selectedPaymentOption === 'MASTER_CARD' ? (
            <CheckCircleOutlinedIcon
              color="inherit"
              className="text-neutral-900"
            />
          ) : null}
        </button>
        <button
          type="button"
          onClick={() => setSelectedPaymentOption('PAYPAL')}
          className={genButtonClasses(selectedPaymentOption === 'PAYPAL')}
        >
          {selectedPaymentOption === 'PAYPAL' ? (
            <div className="absolute -bottom-3 left-[calc(75%_+_1rem)] z-10 aspect-square w-5 rotate-45 border-2 border-t-0 border-l-0 border-solid border-neutral-900 bg-gray-50" />
          ) : null}
          <img
            src={assets.images.paypal}
            className="mr-4 aspect-square w-10 object-contain"
            alt=""
          />
          <div className="flex-grow text-start">
            <div className="font-open-sans text-base font-semibold text-neutral-900">
              PayPal
            </div>
          </div>
          {selectedPaymentOption === 'PAYPAL' ? (
            <CheckCircleOutlinedIcon
              color="inherit"
              className="text-neutral-900"
            />
          ) : null}
        </button>
        <button
          type="button"
          onClick={() => setSelectedPaymentOption('CASH')}
          className={genButtonClasses(selectedPaymentOption === 'CASH')}
        >
          {selectedPaymentOption === 'CASH' ? (
            <div className="absolute -bottom-3 left-[calc(75%_+_1rem)] z-10 aspect-square w-5 rotate-45 border-2 border-t-0 border-l-0 border-solid border-neutral-900 bg-gray-50" />
          ) : null}

          <img
            src={assets.images.cash}
            className="mr-4 aspect-square w-10 object-contain"
            alt=""
          />
          <div className="flex-grow text-start">
            <div className="font-open-sans text-base font-semibold text-neutral-900">
              Cash Payment
            </div>
          </div>
          {selectedPaymentOption === 'CASH' ? (
            <CheckCircleOutlinedIcon
              color="inherit"
              className="text-neutral-900"
            />
          ) : null}
        </button>
      </div>
      <div className="my-4 grid grid-cols-2 gap-4">
        <div className="h-full rounded-xl bg-gray-50 p-4 shadow-md">
          <div className="font-open-sans text-xl font-semibold text-neutral-900">
            Saved Card
          </div>
          <div className="mt-2 flex flex-col gap-4">
            <div className="flex w-full items-center rounded-xl p-4 outline outline-2 outline-neutral-900">
              <CheckCircleOutlinedIcon className="mr-4" />
              <div className="flex-grow">
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  Card 1
                </div>
                <div className="font-open-sans text-base font-bold text-neutral-900">
                  xxxx xxxx xxxx 3802
                </div>
              </div>
              <IconButton>
                <DeleteOutlineOutlinedIcon className="text-neutral-900" />
              </IconButton>
            </div>
            <div className="flex w-full items-center rounded-xl p-4 outline outline-2 outline-neutral-300">
              <CircleOutlinedIcon className="mr-4" />
              <div className="flex-grow">
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  Card 1
                </div>
                <div className="font-open-sans text-base font-bold text-neutral-900">
                  xxxx xxxx xxxx 9974
                </div>
              </div>
              <IconButton>
                <DeleteOutlineOutlinedIcon className="text-neutral-900" />
              </IconButton>
            </div>
            <div className="flex w-full items-center rounded-xl p-4 outline outline-2 outline-neutral-300">
              <CircleOutlinedIcon className="mr-4" />
              <div className="flex-grow">
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  Card 1
                </div>
                <div className="font-open-sans text-base font-bold text-neutral-900">
                  xxxx xxxx xxxx 1298
                </div>
              </div>
              <IconButton>
                <DeleteOutlineOutlinedIcon className="text-neutral-900" />
              </IconButton>
            </div>
          </div>
          <div className="py-32"> </div>
        </div>
        <div className="mb-auto rounded-xl bg-gray-50 p-4 shadow-md">
          <div className="font-open-sans text-xl font-semibold text-neutral-900">
            Add New Card
          </div>
          <div className="">
            <label htmlFor="card-number" className="my-2 flex flex-col gap-2">
              <div className="font-open-sans text-sm font-normal text-neutral-500">
                Card Number
              </div>
              <input
                className="rounded-md bg-gray-50 px-2 py-1 outline outline-2 outline-neutral-300 focus:outline-neutral-900"
                type="text"
                id="card-number"
                name="card-number"
              />
            </label>
            <label
              htmlFor="card-holder-name"
              className="my-2 flex flex-col gap-2"
            >
              <div className="font-open-sans text-sm font-normal text-neutral-500">
                Card Holder Name
              </div>
              <input
                className="rounded-md bg-gray-50 px-2 py-1 outline outline-2 outline-neutral-300 focus:outline-neutral-900"
                type="text"
                id="card-holder-name"
                name="card-holder-name"
              />
            </label>
            <div className="flex gap-4">
              <label htmlFor="expiry" className="my-2 flex flex-col gap-2">
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  Expiry
                </div>
                <input
                  className="rounded-md bg-gray-50 px-2 py-1 outline outline-2 outline-neutral-300 focus:outline-neutral-900"
                  type="text"
                  id="expiry"
                  name="expiry"
                />
              </label>

              <label htmlFor="cvv" className="my-2 flex flex-col gap-2">
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  CVV
                </div>
                <input
                  className="rounded-md bg-gray-50 px-2 py-1 outline outline-2 outline-neutral-300 focus:outline-neutral-900"
                  type="text"
                  id="cvv"
                  name="cvv"
                />
              </label>
            </div>
            <div className="w-full text-end">
              <Button
                color="inherit"
                className="my-2 justify-self-end rounded-xl bg-neutral-900 px-16 text-center font-open-sans text-base font-semibold text-gray-50"
              >
                Add Card
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSettingPage;
