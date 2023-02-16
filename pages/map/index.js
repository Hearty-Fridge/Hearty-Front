import FridgeList from '@components/Fridge/FridgeList';
import FridgeDetail from '@components/Fridge/FridgeDetail';
import Layout from '@components/Layout';
import Map from '@components/Map/Map';
import { useState, useEffect, useCallback } from 'react';
import { getAllFridges } from 'api/Fridges/useFridges';
import { useRouter } from 'next/router';
import getDistanceFromLatLonInKm from 'utils/getDIstance';

// default centerLoc이랑 centerLoc이랑 따로 둬야 할 듯
const MapPage = () => {
  const router = useRouter();
  const { data, refetch } = getAllFridges();
  const [detail, setDetail] = useState();
  const [centerLoc, setCenterLoc] = useState();
  const [isList, setIsList] = useState(true);
  const [gpsLoc, setGpsLoc] = useState(null); // 거리를 구하기 위함
  const [visibleList, setVisibleList] = useState(null);

  const setVisibleListInBoundary = ({ minLat, maxLat, minLng, maxLng }) => {
    let tmp = [];
    data?.forEach((elem) => {
      // 눈에 보이는 영역 안에 있으면
      if (
        minLat <= elem.lat &&
        elem.lat <= maxLat &&
        minLng <= elem.lng &&
        elem.lng <= maxLng
      ) {
        // GPSLoc이 null이면 gps를 불러오지 못함
        // -> 현재 위치의 lat과 lng를 알 수 없음.
        if (gpsLoc) {
          tmp.push({
            ...elem,
            dist: getDistanceFromLatLonInKm({
              lat1: elem.lat,
              lng1: elem.lng,
              lat2: gpsLoc?.lat,
              lng2: gpsLoc?.lng,
            }),
          });
          tmp.sort((a, b) => {
            return parseFloat(a.dist) - parseFloat(b.dist);
          });
        }
      }
    });
    // 오름차순 정렬
    setVisibleList(tmp);
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.id) {
        setDetail(router.query.id);
      } else {
        setDetail(null);
      }
    }
  }, [router.query, setDetail]);

  const onMapLoad = ({ map, maps }) => {
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setGpsLoc(pos);
        setCenterLoc(pos);
      }
    );
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
      />
    </Layout>
  );
};

export default MapPage;
