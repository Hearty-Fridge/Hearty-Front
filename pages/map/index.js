import FridgeList from '@components/Fridge/FridgeList';
import FridgeDetail from '@components/Fridge/FridgeDetail';
import Layout from '@components/Layout';
import Map from '@components/Map/Map';
import { useState, useEffect, useCallback } from 'react';
import { getAllFridges } from 'api/Fridges/useFridges';
import { useRouter } from 'next/router';
import getDistanceFromLatLonInKm from 'utils/getDIstance';
import Donation from '@components/Fridge/Donation';
import Reservation from '@components/Fridge/Reservation';

// default centerLoc이랑 centerLoc이랑 따로 둬야 할 듯
const MapPage = () => {
  const router = useRouter();
  const { data, refetch } = getAllFridges();
  const [detailData, setDetailData] = useState();
  const [isDetail, setIsDetail] = useState();
  const [isReserve, setIsReserve] = useState(false);
  const [isDonate, setIsDonate] = useState(false);
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
        tmp.push({
          ...elem,
          dist: getDistanceFromLatLonInKm({
            lat1: elem.lat,
            lng1: elem.lng,
            lat2: gpsLoc.lat,
            lng2: gpsLoc.lng,
          }),
        });
      }
    });

    // 오름차순 정렬
    tmp.sort((a, b) => {
      return parseFloat(a.dist) - parseFloat(b.dist);
    });
    setVisibleList(tmp);
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.id) {
        setIsDetail(router.query.id);
      } else {
        setIsDetail(null);
      }
      if (router.query.donate) {
        setIsDonate(true);
      } else {
        setIsDonate(false);
      }
      if (router.query.reserve) {
        setIsReserve(true);
      } else {
        setIsReserve(false);
      }
    }
  }, [router.query, setIsDetail, setIsDonate, setIsReserve]);

  useEffect(() => {
    // geolocation을 사용할 수 있다면
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const tmpLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setGpsLoc(tmpLoc);
        setCenterLoc(tmpLoc);
      });
    } else {
      // default : 서울 시청
      const tmpLoc = {
        lat: 37.330689,
        lng: 126.5930664,
      };
      setGpsLoc(tmpLoc);
      setCenterLoc(tmpLoc);
    }
  }, [setGpsLoc, data]);

  return (
    <Layout>
      {centerLoc ? (
        <>
          <FridgeList setCenterLoc={setCenterLoc} visibleList={visibleList} />
          {isDonate ? (
            <Donation id={isDetail} />
          ) : isReserve ? (
            <Reservation id={isDetail} />
          ) : (
            isDetail && (
              <FridgeDetail
                isList={isList}
                setIsList={setIsList}
                setIsDetail={setIsDetail}
                setDetailData={setDetailData}
                fridgeId={isDetail}
              />
            )
          )}
          <Map
            centerLoc={centerLoc}
            setVisibleListInBoundary={setVisibleListInBoundary}
          />
        </>
      ) : (
        <>Loading Page</>
      )}
    </Layout>
  );
};

export default MapPage;
