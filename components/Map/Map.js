import GoogleMapReact from 'google-map-react';
import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Marker } from './Marker';
import { getAllFridges } from 'api/Fridges/useFridges';

const Map = ({
  centerLoc, // 필수
  setVisibleListInBoundary,
}) => {
  const { data: allFridges } = getAllFridges();
  const [marker, setMarker] = useState(null);
  // 클릭하면 마커 생성
  const onClickMap = useCallback((e) => {
    setMarker({ lat: e.lat, lng: e.lng });
  }, []);

  const onClickMarker = useCallback((id, lat, lng) => {
    // 아래 애들 다 지우고 router.push
    // setShowDetail(id);
    // setCenterLoc({ lat: lat, lng: lng });
  }, []);

  useEffect(() => {
    setMarker({ lat: centerLoc.lat, lng: centerLoc.lng });
  }, [setMarker]);

  return (
    <MapWrapper>
      <GoogleMapReact
        bootstrapURLKeys={{
          language: 'en',
          region: 'US',
          key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
        }}
        defaultZoom={20}
        onClick={onClickMap}
        center={centerLoc}
        onChange={(e) => {
          setVisibleListInBoundary({
            minLat: e.bounds.se.lat,
            maxLat: e.bounds.nw.lat,
            minLng: e.bounds.nw.lng,
            maxLng: e.bounds.se.lng,
          });
        }}
      >
        {allFridges?.map((m) => (
          <Marker
            onClick={() => onClickMarker(m.id, m.lat, m.lng)}
            key={m.fridgeId}
            color="blue"
            {...{ lat: m.lat, lng: m.lng }}
          />
        ))}
        {marker && <Marker color="red" {...marker} />}
      </GoogleMapReact>
    </MapWrapper>
  );
};

export default Map;

export const MapWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 112px);
  /* width: calc(100vw - 591px);
  height: calc(100vh - 137px); */
`;
