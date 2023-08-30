import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

import assets from '../../assets'
import { useAppDispatch } from '../../redux/redux-hooks'
import { setUserAddress } from '../../redux/features/deviceState'

type Props = {
  center: google.maps.LatLngLiteral
  zoom: number
  handleDragged?: (newPosition: google.maps.LatLngLiteral) => void
  // onAddressChange: (data: string) => void
}

const loader = new Loader({
  apiKey: 'AIzaSyBp7k8-SYDkEkhcGbXQ9f_fAXPXmwmlvUQ',
  version: 'weekly',
})

function Map({
  center,
  zoom,
  handleDragged,
  // onAddressChange,
  ...props
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | undefined>()
  const [geoCoder, setGeoCoder] = useState<google.maps.Geocoder | null>(null)
  const [address, setAddress] = useState<string | any>('')
  const markerRef: any = useRef<google.maps.Marker | undefined>(undefined)
  const dispatch = useAppDispatch()

  useEffect(() => {
    loader.load().then(async () => {
      const options: google.maps.MapOptions = await {
        center,
        zoom,
        mapTypeId: 'roadmap',
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        scaleControl: false,
      }

      const map = new google.maps.Map(mapRef.current!, options)
      setMap(map)

      const geocoder = new google.maps.Geocoder()
      setGeoCoder(geocoder)

      const marker = new google.maps.Marker({
        position: center,
        map,
        title: 'Location',
        icon: assets.images.iconMap,
        draggable: true,
        animation: google.maps.Animation.DROP,
      })
      markerRef.current = marker
      if (markerRef.current) {
        google.maps.event.addListener(markerRef.current, 'dragend', () => {
          const newPosition = markerRef.current?.getPosition()
          if (newPosition) {
            setMap((prevMap) => {
              if (prevMap) {
                const newCenter = new google.maps.LatLng(newPosition.toJSON())
                prevMap.setCenter(newCenter)
                geocoder.geocode(
                  { location: newCenter },
                  (
                    results: google.maps.GeocoderResult[] | null,
                    status: google.maps.GeocoderStatus,
                  ) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                      if (results && results[0]) {
                        setAddress(results[0].formatted_address)
                        dispatch(setUserAddress(results[0].formatted_address))
                      }
                    }
                  },
                )
              }
              return prevMap
            })
          }
        })
      }
    })
  }, [center, zoom, markerRef, dispatch])

  useEffect(() => {
    if (map && geoCoder) {
      const latLng = new google.maps.LatLng(center)
      geoCoder.geocode(
        { location: latLng },
        (
          results: google.maps.GeocoderResult[] | null,
          status: google.maps.GeocoderStatus,
        ) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results && results[0]) {
              setAddress(results[0].formatted_address)
              dispatch(setUserAddress(results[0].formatted_address))
            }
          }
        },
      )
      google.maps.event.addListener(markerRef.current, 'dragend', () => {
        const newPosition = markerRef.current?.getPosition()
        if (newPosition) {
          handleDragged?.(newPosition.toJSON())
          geoCoder.geocode(
            { location: newPosition },
            (
              results: google.maps.GeocoderResult[] | null,
              status: google.maps.GeocoderStatus,
            ) => {
              if (status === google.maps.GeocoderStatus.OK) {
                if (results && results[0]) {
                  const newFormattedAddress: string =
                    results[0].formatted_address
                  // onAddressChange(newFormattedAddress) // Call the callback to update the address in DeliveryAddressPage
                }
              }
            },
          )
        }
      })
    }
  }, [map, geoCoder, center, dispatch, handleDragged])

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    />
  )
}

export default Map
