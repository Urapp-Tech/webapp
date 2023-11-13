import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Map from '../../components/common/Map';
import LocationPopupClasses from './LocationPopup.module.css';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function LocationPopup({ open, setOpen }: Props) {
  const [location, setLocation] = useState<any>();
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  const onCloseHandler = (event: object, reason: string) => {
    if (reason === 'backdropClick') {
      setOpen(false);
    }
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCQ_g14OfzLkLOD6MGp4iJPuau2mbnjwvw',
  });
  const calculateRoute = useCallback(
    function callback(start: google.maps.LatLng, end: google.maps.LatLng) {
      const request: google.maps.DirectionsRequest = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      directionsService?.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer?.setDirections(result);
        }
      });
    },
    [directionsService, directionsRenderer]
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      return setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <Dialog
      onClose={onCloseHandler}
      open={open}
      PaperProps={{
        className: LocationPopupClasses.Dialog,
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <IconButton
        onClick={() => setOpen(false)}
        className={LocationPopupClasses.Dialog_CloseButton}
      >
        <ClearIcon />
      </IconButton>
      <div className={LocationPopupClasses.Content}>
        <div className={LocationPopupClasses.Map}>
          {isLoaded ? <Map center={location} zoom={17} /> : null}
        </div>
        <div className={LocationPopupClasses.SC}>
          <Swiper
            className={LocationPopupClasses.Slider}
            slidesPerView={1.25}
            onSlideChange={(e) => {
              if (e.activeIndex === 0) {
                calculateRoute(
                  new google.maps.LatLng({
                    lat: 24.878,
                    lng: 67.064,
                  }),
                  new google.maps.LatLng({
                    lat: 24.882,
                    lng: 67.067,
                  })
                );
                return;
              }
              if (e.activeIndex === 1) {
                calculateRoute(
                  new google.maps.LatLng({
                    lat: 24.878,
                    lng: 67.064,
                  }),
                  new google.maps.LatLng({
                    lat: 24.876,
                    lng: 67.067,
                  })
                );
                return;
              }
              if (e.activeIndex === 2) {
                calculateRoute(
                  new google.maps.LatLng({
                    lat: 24.878,
                    lng: 67.064,
                  }),
                  new google.maps.LatLng({
                    lat: 24.875,
                    lng: 67.062,
                  })
                );
              }
            }}
          >
            <SwiperSlide>
              <div className={LocationPopupClasses.SlideItem}>
                <div className={LocationPopupClasses.SlideItem_Head}>
                  <div className={LocationPopupClasses.SlideItem_Head_Name}>
                    Address 1
                  </div>
                  <div>70.0km</div>
                </div>
                <div className={LocationPopupClasses.SlideItem_Body}>
                  926 Paseo Del Pueblo Sur, Taos, NM 87571, United States of
                  America.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={LocationPopupClasses.SlideItem}>
                <div className={LocationPopupClasses.SlideItem_Head}>
                  <div className={LocationPopupClasses.SlideItem_Head_Name}>
                    Address 2
                  </div>
                  <div>50.0km</div>
                </div>
                <div className={LocationPopupClasses.SlideItem_Body}>
                  926 Paseo Del Pueblo Sur, Taos, NM 87571, United States of
                  America.
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={LocationPopupClasses.SlideItem}>
                <div className={LocationPopupClasses.SlideItem_Head}>
                  <div className={LocationPopupClasses.SlideItem_Head_Name}>
                    Address 3
                  </div>
                  <div>30.0km</div>
                </div>
                <div className={LocationPopupClasses.SlideItem_Body}>
                  926 Paseo Del Pueblo Sur, Taos, NM 87571, United States of
                  America.
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </Dialog>
  );
}

export default LocationPopup;
