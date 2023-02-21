import FridgeList from '@components/Fridge/FridgeList';
import FridgeDetail from '@components/Fridge/FridgeDetail';
import Layout from '@components/Layout';
import Map from '@components/Map';
import { useState, useEffect, useCallback, useRef } from 'react';
import { getAllFridges } from 'api/Fridges/useFridges';
import { useRouter } from 'next/router';
import getDistanceFromLatLonInKm from 'utils/getDIstance';

// default centerLoc이랑 centerLoc이랑 따로 둬야 할 듯
const MapPage = () => {
  const router = useRouter();
  const { data, refetch } = getAllFridges({ id: 1 });
  const [detail, setDetail] = useState();
  const [centerLoc, setCenterLoc] = useState();
  const [isList, setIsList] = useState(true);
  const [gpsLoc, setGpsLoc] = useState(null); // 거리를 구하기 위함
  const [visibleList, setVisibleList] = useState(null);
  const mapRef = useRef(null);
  const boundsRef = useRef(null);

  const setVisibleListInBoundary = useCallback(() => {
    const minLat = boundsRef.current.Ua.lo;
    const maxLat = boundsRef.current.Ua.hi;
    const minLng = boundsRef.current.Ia.lo;
    const maxLng = boundsRef.current.Ia.hi;
    let tmp = [];
    data?.fridgeList.forEach((elem) => {
      // 눈에 보이는 영역 안에 있으면
      if (
        minLat <= elem.fridgeInfo.lat &&
        elem.fridgeInfo.lat <= maxLat &&
        minLng <= elem.fridgeInfo.lng &&
        elem.fridgeInfo.lng <= maxLng
      ) {
        // GPSLoc이 null이면 gps를 불러오지 못함
        // -> 현재 위치의 lat과 lng를 알 수 없음.
        if (gpsLoc) {
          tmp.push({
            ...elem,
            dist: getDistanceFromLatLonInKm({
              lat1: elem.fridgeInfo.lat,
              lng1: elem.fridgeInfo.lng,
              lat2: gpsLoc.lat,
              lng2: gpsLoc.lng,
            }),
          });
        } else {
          tmp.push({
            ...elem,
          });
        }
      }
    });
    // 오름차순 정렬
    tmp.sort((a, b) => {
      return parseFloat(a.dist) - parseFloat(b.dist);
    });
    setVisibleList(tmp);
  }, [data, gpsLoc, setVisibleList, boundsRef.current]);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.id) {
        setDetail(router.query.id);
      } else {
        setDetail(null);
      }
    }
  }, [router.query, setDetail]);

  useEffect(() => {
    if (boundsRef.current) {
      setVisibleListInBoundary();
    }
  }, [data, boundsRef.current]);

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

  const handleBoundsChanged = () => {
    // Update the reference to the map bounds
    if (boundsRef.current) {
      boundsRef.current = mapRef.current.getBounds();
      setVisibleListInBoundary();
    }
  };

  return (
    <Layout>
      <FridgeList setCenterLoc={setCenterLoc} visibleList={visibleList} />
      {detail && <FridgeDetail isList={isList} setIsList={setIsList} />}
      <Map
        centerLoc={centerLoc}
        setCenterLoc={setCenterLoc}
        setVisibleListInBoundary={setVisibleListInBoundary}
        onMapLoad={onMapLoad}
        detail={detail}
        setDetail={setDetail}
        handleBoundsChanged={handleBoundsChanged}
      />
    </Layout>
  );
};

export default MapPage;
