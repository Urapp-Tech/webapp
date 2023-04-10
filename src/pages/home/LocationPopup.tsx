import { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import LocationPopupClasses from './LocationPopup.module.css';
import assets from '../../assets';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const googleMapsStyles = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#52525B',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#D6D3D1',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#F4F4F5',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#737373',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#A3A3A3',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#737373',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#D4D4D8',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#52525B',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#A3A3A3',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#F4F4F5',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#D6D3D1',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#A3A3A3',
      },
    ],
  },
];

const containerStyle = {
  width: '100%',
  height: '100%',
};

function LocationPopup({ open, setOpen }: Props) {
  const [renderMap, setRenderMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  const center = useMemo(
    () => ({
      lat: 24.87859,
      lng: 67.064085,
    }),
    []
  );
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

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      setDirectionsService(new window.google.maps.DirectionsService());
      const rendererOptions: google.maps.DirectionsRendererOptions = {
        map,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#171717',
        },
        markerOptions: {
          animation: google.maps.Animation.DROP,
          icon: assets.images.googleMapMarker,
        },
      };
      setDirectionsRenderer(
        new window.google.maps.DirectionsRenderer(rendererOptions)
      );
      map.setZoom(15);
      map.setCenter(center);
      setRenderMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setRenderMap(null);
    setDirectionsService(null);
    setDirectionsRenderer(null);
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
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              options={{
                disableDefaultUI: true,
                styles: googleMapsStyles,
              }}
              onLoad={onLoad}
              onUnmount={onUnmount}
            />
          ) : null}
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
