import GoogleMapReact from 'google-map-react';
import { useState, useEffect, useCallback } from 'react';
import { MapWrapper } from './styles';

const Marker = ({ color }) => (
  <div className={'marker'}>
    <div style={{ color: `${color}` }}>★</div>
  </div>
);

const MapComponent = ({ mark }) => {
  const [loc, setLoc] = useState(null);
  const [marker, setMarker] = useState(null);

  const onClickMap = useCallback((e) => {
    setMarker({ lat: e.lat, lng: e.lng });
  }, []);

  useEffect(() => {
    // geolocation을 사용할 수 있다면
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      setLoc({
        lat: 37.330689,
        lng: 126.5930664,
      });
    }
  }, []);

  return (
    <MapWrapper>
      {loc ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY }}
          defaultZoom={20}
          onClick={onClickMap}
          defaultCenter={loc}
        >
          {mark && mark.mark.map((m) => <Marker color="blue" {...m.loc} />)}
          {marker && <Marker color="red" {...marker} />}
        </GoogleMapReact>
      ) : (
        <div>Loading...</div>
      )}
    </MapWrapper>
  );
};

export default MapComponent;
