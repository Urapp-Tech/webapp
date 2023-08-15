import { useState } from 'react';
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
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DeleteAddressPopup from './DeleteAddressPopup';
import assets from '../../assets';

function DeliveryAddressPage() {
  const [delAddress, setDelAddress] = useState<boolean>(false);
  return (
    <>
      <DeleteAddressPopup open={delAddress} setOpen={setDelAddress} />
      <div className="p-4 sm:p-5 xl:p-7 delivery-address-page">
        <h4 className="main-heading">Delivery Address</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="saved-addresses">
              <h5 className="heading">Saved Addresses</h5>
              <div className="addresses-list">
                <div className="item active">
                  <CheckCircleOutlinedIcon className="icon checked" />
                  <CircleOutlinedIcon className="icon unchecked" />
                  <div className="address">
                    <p className="location">Home</p>
                    <h6 className="detailed">
                      917 Davie St, Vancouver, British Columbia.
                    </h6>
                  </div>
                  <IconButton className="btn-del" onClick={() => setDelAddress(true)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </div>
                <div className="item">
                  <CheckCircleOutlinedIcon className="icon checked" />
                  <CircleOutlinedIcon className="icon unchecked" />
                  <div className="address">
                    <p className="location">Office</p>
                    <h6 className="detailed">
                      6200 N Shepherd Dr, Houston, Texas.
                    </h6>
                  </div>
                  <IconButton className="btn-del" onClick={() => setDelAddress(true)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </div>
                <div className="item">
                  <CheckCircleOutlinedIcon className="icon checked" />
                  <CircleOutlinedIcon className="icon unchecked" />
                  <div className="address">
                    <p className="location">Office</p>
                    <h6 className="detailed">
                      6200 N Shepherd Dr, Houston, Texas.
                    </h6>
                  </div>
                  <IconButton className="btn-del" onClick={() => setDelAddress(true)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
          <div className="select-location">
            <div className='header'>
              <img
                src={assets.tempImages.map}
                alt=""
                className="aspect-video w-full object-cover"
              />
            </div>
            <div className='body'>
              <h5 className="title">Select Location</h5>
              <FormControl className="location-address" variant="standard">
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
                <IconButton className="btn-current-location">
                  <MyLocationIcon />
                </IconButton>
              </FormControl>
              <p className="location-label">Save As</p>
              <div className="grid grid-cols-3 gap-3 all-locations">
                <div className="item">
                  <input type="radio" name='location'/>
                  <div className='content'>
                    <div className="icon">
                      <HomeOutlinedIcon />
                    </div>
                    <p className="text">Home</p>
                  </div>
                </div>
                <div className="item">
                  <input type="radio" name='location' />
                  <div className='content'>
                    <div className="icon">
                      <WorkOutlineOutlinedIcon />
                    </div>
                    <p className="text">Office</p>
                  </div>
                </div>
                <div className="item">
                  <input type="radio" name='location' />
                  <div className='content'>
                    <div className="icon">
                      <LocationOnOutlinedIcon />
                    </div>
                    <p className="text">Others</p>
                  </div>
                </div>
              </div>
              <Button color="inherit" className="btn-add-address">
                Add Address
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryAddressPage;
