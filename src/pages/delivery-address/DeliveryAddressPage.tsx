import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import assets from '../../assets';

function DeliveryAddressPage() {
  return (
    <div className="container px-5 py-5">
      <div className="font-open-sans text-3xl font-semibold text-neutral-900">
        Delivery Address
      </div>
      <div className="my-4 grid grid-cols-2 gap-4">
        <div className="h-full rounded-xl bg-gray-50 p-4 shadow-md">
          <div className="font-open-sans text-xl font-semibold text-neutral-900">
            Saved Addresses
          </div>
          <div className="mt-2 flex flex-col gap-4">
            <div className="flex w-full items-center rounded-xl p-4 outline outline-2 outline-neutral-900">
              <CheckCircleOutlinedIcon className="mr-4" />
              <div className="flex-grow">
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  Home
                </div>
                <div className="font-open-sans text-base font-bold text-neutral-900">
                  917 Davie St, Vancouver, British Columbia.
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
                  Office
                </div>
                <div className="font-open-sans text-base font-bold text-neutral-900">
                  6200 N Shepherd Dr, Houston, Texas.
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
                  Other
                </div>
                <div className="font-open-sans text-base font-bold text-neutral-900">
                  6200 N Shepherd Dr, Houston, Texas.
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
          <img
            src={assets.tempImages.map}
            alt=""
            className="aspect-video w-full object-cover"
          />
          <div className="my-2 font-open-sans text-lg font-bold text-neutral-900">
            Select Location
          </div>
          <FormControl className="mb-4 w-full" variant="standard">
            <InputLabel
              className="font-open-sans text-sm font-normal text-neutral-500"
              htmlFor="location"
            >
              Your Location
            </InputLabel>
            <Input
              className="font-open-sans text-base font-semibold text-neutral-900 after:border-b-neutral-900"
              id="location"
              type="location"
            />
          </FormControl>
          <div className="mb-4 font-open-sans text-sm font-normal text-neutral-500">
            Save As
          </div>
          <div className="grid w-full grid-cols-3 gap-4">
            <div className="flex w-full items-center rounded-xl bg-neutral-200 p-2">
              <div className="mr-2 flex aspect-square w-8 items-center justify-center rounded-full bg-neutral-300">
                <HomeOutlinedIcon className="text-lg" />
              </div>
              <div className="font-open-sans text-sm font-normal text-neutral-900">
                Home
              </div>
            </div>
            <div className="flex w-full items-center rounded-xl bg-neutral-200 p-2">
              <div className="mr-2 flex aspect-square w-8 items-center justify-center rounded-full bg-neutral-300">
                <WorkOutlineOutlinedIcon className="text-lg" />
              </div>
              <div className="font-open-sans text-sm font-normal text-neutral-900">
                Office
              </div>
            </div>
            <div className="flex w-full items-center rounded-xl bg-neutral-200 p-2">
              <div className="mr-2 flex aspect-square w-8 items-center justify-center rounded-full bg-neutral-300">
                <LocationOnOutlinedIcon className="text-base" />
              </div>
              <div className="font-open-sans text-sm font-normal text-neutral-900">
                Others
              </div>
            </div>
          </div>
          <Button
            color="inherit"
            className="mt-4 w-full rounded-xl bg-neutral-900 py-4 font-open-sans text-xl font-semibold text-gray-50"
          >
            Add Address
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddressPage;
