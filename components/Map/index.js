import GoogleMapReact from 'google-map-react';
import { useState, useEffect, useCallback } from 'react';
import { MapWrapper } from './styles';
import Link from 'next/link';
import { IoLocationSharp } from 'react-icons/io5';

const Marker = ({ color }) => (
  // 일단 마커 누르면 홈으로 가도록 해 둔 상태
  <Link href="/" className={'marker'}>
    <div style={{ color: `${color}`, fontSize: '32px' }}>
      <IoLocationSharp />
    </div>
  </Link>
);

const MapComponent = ({ loc, setLoc, mark }) => {
  const [marker, setMarker] = useState(null);

  // 클릭하면 마커 생성
  const onClickMap = useCallback((e) => {
    setMarker({ lat: e.lat, lng: e.lng });
  }, []);

  // 얘를 Map component에 넣을지 여기에 둘지
  useEffect(() => {
    // geolocation을 사용할 수 있다면
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const tmpLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLoc(tmpLoc);
        setMarker(tmpLoc);
      });
    } else {
      // default : 서울 시청
      const tmpLoc = {
        lat: 37.330689,
        lng: 126.5930664,
      };
      setLoc(tmpLoc);
      setMarker(tmpLoc);
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
          center={loc}
        >
          {mark &&
            mark.map((m) => (
              <Marker
                key={m.address}
                color="blue"
                {...{ lat: m.lat, lng: m.lng }}
              />
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
