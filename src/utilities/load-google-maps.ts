import { Loader } from '@googlemaps/js-api-loader';

let map: any = null;

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

    map = {
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
    };
  }

  return map;
}

export default loadGoogleMaps;
