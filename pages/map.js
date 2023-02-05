import FridgeList from '@components/Fridge/FridgeList';
import FridgeDetail from '@components/Fridge/FridgeDetail';
import Layout from '@components/Layout';
import Map from '@components/Map/Map';
import { useState, useEffect, useCallback } from 'react';
import { getAllFridges } from 'api/Fridges/useFridges';

function getDistanceFromLatLonInKm({ lat1, lng1, lat2, lng2 }) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  var r = 6371; //지구의 반지름(km)
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = r * c; // Distance in km
  return Math.round(d * 1000);
}

// default centerLoc이랑 centerLoc이랑 따로 둬야 할 듯
const MapPage = () => {
  const { data, refetch } = getAllFridges();
  const [showDetail, setShowDetail] = useState(null);
  const [GPSLoc, setGPSLoc] = useState({ lat: 0, lng: 0 });
  const [centerLoc, setCenterLoc] = useState(null);
  const [visibleList, setVisibleList] = useState(null);
  const [marker, setMarker] = useState(null);
  const [detailData, setDetailData] = useState(null);

  const setVisibleListInBoundary = useCallback(
    ({ minLat, maxLat, minLng, maxLng }) => {
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
              lat2: GPSLoc.lat,
              lng2: GPSLoc.lng,
            }),
          });
        }
      });
      // 오름차순 정렬
      tmp.sort((a, b) => {
        return parseFloat(a.dist) - parseFloat(b.dist);
      });
      setVisibleList(tmp);
    },
    [GPSLoc, setVisibleList]
  );

  useEffect(() => {
    setVisibleList(data);
    // geolocation을 사용할 수 있다면
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const tmpLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setGPSLoc(tmpLoc);
        setCenterLoc(tmpLoc);
        setMarker(tmpLoc);
      });
    } else {
      // default : 서울 시청
      const tmpLoc = {
        lat: 37.330689,
        lng: 126.5930664,
      };
      setGPSLoc(tmpLoc);
      setCenterLoc(tmpLoc);
      setMarker(tmpLoc);
    }
  }, [setGPSLoc, setCenterLoc, setMarker, setVisibleList, data]);

  return (
    <Layout>
      <FridgeList
        setCenterLoc={setCenterLoc}
        setShowDetail={setShowDetail}
        visibleList={visibleList}
      />
      {showDetail && (
        <FridgeDetail showDetail={showDetail} setShow={setShowDetail} />
      )}
      <Map
        centerLoc={centerLoc}
        setCenterLoc={setCenterLoc}
        visibleList={visibleList}
        setVisibleListInBoundary={setVisibleListInBoundary}
        marker={marker}
        setMarker={setMarker}
        setShowDetail={setShowDetail}
      />
    </Layout>
  );
};

export default MapPage;
