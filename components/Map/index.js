import GoogleMapReact from 'google-map-react';
import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Marker } from './Marker';
import { useRouter } from 'next/router';

const Map = ({
  centerLoc,
  setCenterLoc,
  onMapLoad,
  visibleList,
  handleBoundsChanged,
}) => {
  const [userMarker, setUserMarker] = useState(null);
  const router = useRouter();

  const handleApiLoadded = ({ map, maps }) => {
    onMapLoad({ map: map });
  };

  // 클릭하면 마커 생성z\
  const onClickMap = useCallback((e) => {
    setUserMarker({ lat: e.lat, lng: e.lng });
  }, []);

  const onClickMarker = useCallback((id, lat, lng) => {
    router.push(`/map?id=${id}`);
    setCenterLoc({ lat: lat, lng: lng });
  }, []);

  useEffect(() => {
    if (centerLoc) {
      setUserMarker({ lat: centerLoc.lat, lng: centerLoc.lng });
    }
  }, [centerLoc, setUserMarker]);

  return (
    <MapWrapper>
      <GoogleMapReact
        resetBoundsOnResize
        bootstrapURLKeys={{
          language: 'en',
          region: 'US',
          key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
        }}
        defaultCenter={{ lat: 37.636276085377, lng: 127.07541828655 }} // 과기대
        defaultZoom={15}
        onGoogleApiLoaded={handleApiLoadded}
        onClick={onClickMap}
        center={centerLoc}
        onChange={() => {
          handleBoundsChanged();
        }}
        options={{ disableDefaultUI: true }}
      >
        {visibleList?.map((m) => (
          <Marker
            onClick={() =>
              onClickMarker(
                m.fridgeInfo.fridgeId,
                m.fridgeInfo.lat,
                m.fridgeInfo.lng
              )
            }
            key={m.fridgeInfo.fridgeId}
            color="blue"
            {...{ lat: m.fridgeInfo.lat, lng: m.fridgeInfo.lng }}
          />
        ))}
        {userMarker && <Marker color="red" {...userMarker} />}
      </GoogleMapReact>
    </MapWrapper>
  );
};

export default Map;

export const MapWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 112px);
`;
