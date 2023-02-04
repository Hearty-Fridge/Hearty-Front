import GoogleMapReact from 'google-map-react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { Marker } from './marker';

const Map = ({
  centerLoc,
  setCenterLoc,
  visibleList,
  setVisibleListInBoundary,
  marker,
  setMarker,
  setShowDetail,
}) => {
  // 클릭하면 마커 생성
  const onClickMap = useCallback((e) => {
    setMarker({ lat: e.lat, lng: e.lng });
  }, []);

  const onClickMarker = useCallback((id, lat, lng) => {
    setShowDetail(id);
    setCenterLoc({ lat: lat, lng: lng });
  }, []);
  // 얘를 Map component에 넣을지 여기에 둘지

  return (
    <MapWrapper>
      {visibleList ? (
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
            setCenterLoc({
              lat: e.center.lat,
              lng: e.center.lng,
            });
            setVisibleListInBoundary({
              minLat: e.bounds.se.lat,
              maxLat: e.bounds.nw.lat,
              minLng: e.bounds.nw.lng,
              maxLng: e.bounds.se.lng,
            });
          }}
        >
          {visibleList &&
            visibleList.map((m) => (
              <Marker
                onClick={() => onClickMarker(m.id, m.lat, m.lng)}
                key={m.id}
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

export default Map;

export const MapWrapper = styled.div`
  overflow: hidden;
  width: calc(100vw - 591px);
  height: calc(100vh - 137px);
`;
