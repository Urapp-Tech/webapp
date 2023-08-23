import { useState, useCallback, useMemo } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import ClearIcon from '@mui/icons-material/Clear';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SelectLocationPopupClasses from './SelectLocationPopup.module.css';
import assets from '../../assets';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const containerStyle = {
  width: '100%',
  height: '100%',
};

function SelectLocationPopup({ open, setOpen }: Props) {
  const [renderMap, setRenderMap] = useState<google.maps.Map | null>(null);
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

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      map.setZoom(15);
      map.setCenter(center);
      setRenderMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(function callback() {
    setRenderMap(null);
  }, []);

  return (
    <Dialog
      onClose={onCloseHandler}
      open={open}
      PaperProps={{
        className: SelectLocationPopupClasses.Dialog,
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <IconButton
        onClick={() => setOpen(false)}
        className={SelectLocationPopupClasses.Dialog_CloseButton}
      >
        <ClearIcon />
      </IconButton>
      <div className={SelectLocationPopupClasses.Content}>
        <div className={SelectLocationPopupClasses.Flex}>
          <div className={SelectLocationPopupClasses.Map}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                options={{
                  disableDefaultUI: true,
                  styles: [
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
                  ],
                }}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                <MarkerF
                  animation={google.maps.Animation.DROP}
                  position={center}
                  draggable={false}
                  icon={assets.images.googleMapMarker}
                />
              </GoogleMap>
            ) : null}
          </div>
          <div className={SelectLocationPopupClasses.Details}>
            <div className={SelectLocationPopupClasses.Details_Title}>
              Select Location
            </div>
            <FormControl
              className={SelectLocationPopupClasses.Details_FormControl}
              variant="standard"
            >
              <InputLabel
                className={
                  SelectLocationPopupClasses.Details_FormControl_InputLabel
                }
                htmlFor="location"
              >
                Your Location
              </InputLabel>
              <Input
                className={SelectLocationPopupClasses.Details_FormControl_Input}
                id="location"
                type="location"
              />
            </FormControl>
            <div className={SelectLocationPopupClasses.Details_SaveText}>
              Save As
            </div>

            <div className={SelectLocationPopupClasses.Details_Grid}>
              <div className={SelectLocationPopupClasses.Details_Badge}>
                <div
                  className={
                    SelectLocationPopupClasses.Details_Badge_Icon_Wrapper
                  }
                >
                  <HomeOutlinedIcon
                    className={SelectLocationPopupClasses.Details_Badge_Icon}
                  />
                </div>
                <div className={SelectLocationPopupClasses.Details_Badge_Text}>
                  Home
                </div>
              </div>
              <div className={SelectLocationPopupClasses.Details_Badge}>
                <div
                  className={
                    SelectLocationPopupClasses.Details_Badge_Icon_Wrapper
                  }
                >
                  <WorkOutlineOutlinedIcon
                    className={SelectLocationPopupClasses.Details_Badge_Icon}
                  />
                </div>
                <div className={SelectLocationPopupClasses.Details_Badge_Text}>
                  Office
                </div>
              </div>
              <div className={SelectLocationPopupClasses.Details_Badge}>
                <div
                  className={
                    SelectLocationPopupClasses.Details_Badge_Icon_Wrapper
                  }
                >
                  <LocationOnOutlinedIcon
                    className={SelectLocationPopupClasses.Details_Badge_Icon}
                  />
                </div>
                <div className={SelectLocationPopupClasses.Details_Badge_Text}>
                  Others
                </div>
              </div>
            </div>
            <Button
              color="inherit"
              className={SelectLocationPopupClasses.Details_Button}
            >
              Confirm Address
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default SelectLocationPopup;
