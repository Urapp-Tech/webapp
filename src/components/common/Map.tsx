import { useEffect, useRef, useState } from 'react';

import assets from '../../assets';
import { setUserAddress } from '../../redux/features/deviceState';
import { useAppDispatch } from '../../redux/redux-hooks';
import loadGoogleMaps from '../../utilities/load-google-maps';

type Props = {
  center: google.maps.LatLngLiteral;
  zoom: number;
  handleDragged?: (newPosition: google.maps.LatLngLiteral) => void;
};

function Map({ center, zoom, handleDragged, ...props }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [geoCoder, setGeoCoder] = useState<google.maps.Geocoder | null>(null);
  const [address, setAddress] = useState<string | any>('');
  const markerRef: any = useRef<google.maps.Marker | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadGoogleMaps().then(async (google) => {
      const options: google.maps.MapOptions = {
        center,
        zoom,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        scaleControl: false,
      };

      const tempMap = new google.Map(mapRef.current!, options);

      const geocoder = new google.Geocoder();
      setGeoCoder(geocoder);

      const marker = new google.Marker({
        position: center,
        map: tempMap,
        title: 'Location',
        icon: assets.images.iconMap,
        draggable: true,
        animation: google.Animation.DROP,
      });

      markerRef.current = marker;

      if (markerRef.current) {
        google.event.addListener(markerRef.current, 'dragend', () => {
          const newPosition = markerRef.current?.getPosition();
          if (newPosition) {
            if (tempMap) {
              const newCenter = new google.LatLng(newPosition.toJSON());
              tempMap.setCenter(newCenter);
              geocoder.geocode(
                { location: newCenter },
                (
                  results: Array<google.maps.GeocoderResult> | null,
                  status: google.maps.GeocoderStatus
                ) => {
                  if (status === google.GeocoderStatus.OK) {
                    if (results && results[0]) {
                      setAddress(results[0].formatted_address);
                      dispatch(setUserAddress(results[0].formatted_address));
                    }
                  }
                }
              );
            }
          }
        });
      }
    });
  }, [center, dispatch, zoom]);

  useEffect(() => {
    loadGoogleMaps().then(async (google) => {
      if (geoCoder) {
        const latLng = new google.LatLng(center);
        geoCoder.geocode(
          { location: latLng },
          (
            results: Array<google.maps.GeocoderResult> | null,
            status: google.maps.GeocoderStatus
          ) => {
            if (status === google.GeocoderStatus.OK) {
              if (results && results[0]) {
                setAddress(results[0].formatted_address);
                dispatch(setUserAddress(results[0].formatted_address));
              }
            }
          }
        );
        google.event.addListener(markerRef.current, 'dragend', () => {
          const newPosition = markerRef.current?.getPosition();
          if (newPosition) {
            handleDragged?.(newPosition.toJSON());
            geoCoder.geocode(
              { location: newPosition },
              (
                results: Array<google.maps.GeocoderResult> | null,
                status: google.maps.GeocoderStatus
              ) => {
                if (status === google.GeocoderStatus.OK) {
                  if (results && results[0]) {
                    const newFormattedAddress: string =
                      results[0].formatted_address;
                  }
                }
              }
            );
          }
        });
      }
    });
  }, [geoCoder, center, dispatch, handleDragged]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    />
  );
}

export default Map;
