import GoogleMapReact from 'google-map-react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useCallback, useState, useEffect, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import { Marker } from './Marker';
import { getAllFridges } from 'api/Fridges/useFridges';
import { useRouter } from 'next/router';

const Map = ({
  centerLoc,
  setCenterLoc,
  setVisibleListInBoundary,
  onMapLoad,
}) => {
  const { data: allFridges } = getAllFridges({ id: 1 });
  const router = useRouter();
  const [marker, setMarker] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);

  const handleApiLoadded = ({ map, maps }) => {
    onMapLoad(map);
  };

  // 클릭하면 마커 생성
  const onClickMap = useCallback((e) => {
    setMarker({ lat: e.lat, lng: e.lng });
  }, []);

  const onClickMarker = useCallback((id, lat, lng) => {
    router.push(`/map?id=${id}`);
    setCenterLoc({ lat: lat, lng: lng });
  }, []);

  useEffect(() => {
    if (centerLoc) {
      setMarker({ lat: centerLoc.lat, lng: centerLoc.lng });
    }
  }, [centerLoc, setMarker]);

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
        bounds={mapBounds}
        onChange={(e) => {
          setVisibleListInBoundary({
            minLat: e.bounds.se.lat,
            maxLat: e.bounds.nw.lat,
            minLng: e.bounds.nw.lng,
            maxLng: e.bounds.se.lng,
          });
        }}
      >
        {allFridges?.fridgeList.map((m) => (
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
`;
