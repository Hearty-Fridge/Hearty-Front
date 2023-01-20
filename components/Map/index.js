import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';

const Marker = (props) => (
  <div className={'marker'}>
    <div>Hi</div>
  </div>
);

const MapComponent = () => {
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
          {marker && <Marker {...marker} />}
        </GoogleMapReact>
      ) : (
        <div>Loading...</div>
      )}
    </MapWrapper>
  );
};

export default MapComponent;

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
