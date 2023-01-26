import GoogleMapReact from 'google-map-react';
import { useState, useEffect, useCallback } from 'react';
import { MapWrapper } from './styles';
import Link from 'next/link';
import { IoLocationSharp } from 'react-icons/io5';

const Marker = ({ color }) => (
  // 일단 마커 누르면 홈으로 가도록 해 둔 상태
  <Link href="/" className={'marker'}>
    <div style={{ color: `${color}`, fontSize: '20px' }}>
      <IoLocationSharp />
    </div>
  </Link>
);

const MapComponent = ({ mark }) => {
  const [loc, setLoc] = useState(null);
  const [marker, setMarker] = useState(null);

  // 클릭하면 마커 생성
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
      // default : 서울 시청
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
          bootstrapURLKeys={{
            language: 'en',
            region: 'US',
            key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
          }}
          defaultZoom={20}
          onClick={onClickMap}
          defaultCenter={loc}
        >
          {mark &&
            mark.map((m) => (
              <Marker color="blue" {...{ lat: m.lat, lng: m.lng }} />
            ))}
          {marker && <Marker color="red" {...marker} />}
        </GoogleMapReact>
      ) : (
        <div>Loading...</div>
      )}
    </MapWrapper>
  );
};

export default MapComponent;
