import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import Map from '@components/Map';
import FridgeList from '@components/Fridge/FridgeList';
import FridgeDetail from '@components/Fridge/FridgeDetail';
import { getAllFridges } from 'api/Fridges/useFridges';
import getDistanceFromLatLonInKm from 'utils/getDIstance';

const MapPage = () => {
  const router = useRouter();
  const mapRef = useRef(null);
  const boundsRef = useRef(null);

  const [detail, setDetail] = useState(null);
  const [centerLoc, setCenterLoc] = useState(null);
  const [gpsLoc, setGpsLoc] = useState(null);
  const [visibleList, setVisibleList] = useState(null);
  const [marker, setMarker] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data, refetch } = getAllFridges({ id: 1 });

  const setVisibleListInBoundary = useCallback(() => {
    // 이 부분 업데이트 될 때마다 Ka , Va 저 부분 바뀌는거 같음
    const minLat = boundsRef.current?.Va.lo;
    const maxLat = boundsRef.current?.Va.hi;
    const minLng = boundsRef.current?.Ka.lo;
    const maxLng = boundsRef.current?.Ka.hi;

    const tmp = data?.fridgeList
      .filter(
        (elem) =>
          minLat <= elem.fridgeInfo.lat &&
          elem.fridgeInfo.lat <= maxLat &&
          minLng <= elem.fridgeInfo.lng &&
          elem.fridgeInfo.lng <= maxLng
      )
      .map((elem) => ({
        ...elem,
        dist: gpsLoc
          ? getDistanceFromLatLonInKm({
              lat1: elem.fridgeInfo.lat,
              lng1: elem.fridgeInfo.lng,
              lat2: gpsLoc.lat,
              lng2: gpsLoc.lng,
            })
          : null,
      }))
      .sort((a, b) => parseFloat(a.dist) - parseFloat(b.dist));

    setVisibleList(tmp);
  }, [boundsRef, data?.fridgeList, gpsLoc]);

  const setFavoriteList = useCallback(() => {
    const tmp = data?.fridgeList
      .filter((m) => m.isBookmark)
      .map((m) => ({
        ...m,
        dist: gpsLoc
          ? getDistanceFromLatLonInKm({
              lat1: m.fridgeInfo.lat,
              lng1: m.fridgeInfo.lng,
              lat2: gpsLoc.lat,
              lng2: gpsLoc.lng,
            })
          : null,
      }))
      .sort((a, b) => parseFloat(a.dist) - parseFloat(b.dist));

    setVisibleList(tmp);
  }, [data?.fridgeList, gpsLoc]);

  const onMapLoad = ({ map, maps }) => {
    mapRef.current = map;
    boundsRef.current = map.getBounds();
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setGpsLoc(pos);
        setCenterLoc(pos);
      }
    );
  };

  const handleBoundsChanged = useCallback(() => {
    if (boundsRef.current) {
      boundsRef.current = mapRef.current.getBounds();
      setVisibleListInBoundary();
    }
  }, [setVisibleListInBoundary]);

  useEffect(() => {
    if (router.isReady) {
      setDetail(router.query.id || null);
    }
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    if (boundsRef.current) {
      if (isFavorite) {
        setFavoriteList();
      } else {
        setVisibleListInBoundary();
      }
    }
  }, [data, boundsRef.current, isFavorite]);

  return (
    <Layout>
      <FridgeList
        setCenterLoc={setCenterLoc}
        visibleList={visibleList}
        isFavorite={isFavorite}
        setIsFavorite={setIsFavorite}
      />
      {detail && <FridgeDetail id={detail}/>}
      <Map
        centerLoc={centerLoc}
        setCenterLoc={setCenterLoc}
        marker={marker}
        setMarker={setMarker}
        visibleList={visibleList}
        onMapLoad={onMapLoad}
        handleBoundsChanged={handleBoundsChanged}
      />
    </Layout>
  );
};

export default MapPage;
