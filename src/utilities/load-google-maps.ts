import { Loader } from '@googlemaps/js-api-loader';

let map: Readonly<{
  Map: typeof google.maps.Map;
  Geocoder: typeof google.maps.Geocoder;
  GeocoderStatus: typeof google.maps.GeocoderStatus;
  Marker: typeof google.maps.Marker;
  Animation: typeof google.maps.Animation;
  LatLng: typeof google.maps.LatLng;
  event: typeof google.maps.event;
  TravelMode: typeof google.maps.TravelMode;
  DirectionsService: typeof google.maps.DirectionsService;
  DirectionsRenderer: typeof google.maps.DirectionsRenderer;
}> | null = null;

async function loadGoogleMaps() {
  if (!map) {
    const loader = new Loader({
      apiKey: 'AIzaSyBp7k8-SYDkEkhcGbXQ9f_fAXPXmwmlvUQ',
      version: 'weekly',
    });

    const mapsPromise = loader.importLibrary('maps');
    const geocodingPromise = loader.importLibrary('geocoding');
    const markerPromise = loader.importLibrary('marker');
    const corePromise = loader.importLibrary('core');
    const routesPromise = loader.importLibrary('routes');

    const [
      { Map },
      { Geocoder, GeocoderStatus },
      { Marker, Animation },
      { LatLng, event },
      { TravelMode, DirectionsService, DirectionsRenderer },
    ] = await Promise.all([
      mapsPromise,
      geocodingPromise,
      markerPromise,
      corePromise,
      routesPromise,
    ]);

    map = Object.freeze({
      Map,
      Geocoder,
      GeocoderStatus,
      Marker,
      Animation,
      LatLng,
      event,
      TravelMode,
      DirectionsService,
      DirectionsRenderer,
    });
  }

  return map;
}

export default loadGoogleMaps;
