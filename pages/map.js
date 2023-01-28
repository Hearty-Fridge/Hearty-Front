import FridgeList from '@components/FridgeList';
import Layout from '@components/Layout';
import MapComponent from '@components/Map';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

// default centerLoc이랑 centerLoc이랑 따로 둬야 할 듯
const Map = ({ res }) => {
  const [GPSLoc, setGPSLoc] = useState(null);
  const [centerLoc, setCenterLoc] = useState(null);
  const [visibleList, setVisibleList] = useState(res);
  const [marker, setMarker] = useState(null);

  const setVisibleListInBoundary = useCallback(
    ({ minLat, maxLat, minLng, maxLng }) => {
      console.log(GPSLoc);
      let tmp = [];
      res.forEach((elem) => {
        if (
          minLat <= elem.lat &&
          elem.lat <= maxLat &&
          minLng <= elem.lng &&
          elem.lng <= maxLng
        ) {
          // 거리순으로 정렬을 어떻게 해야할지 모르겠네
          if (GPSLoc) {
            const t =
              Math.abs(elem.lat - GPSLoc.lat) + Math.abs(elem.lng - GPSLoc.lng);
            tmp.push({ ...elem, dist: t });
          } else {
            tmp.push(elem);
          }
        }
      });
      if (GPSLoc) {
        tmp.sort((a, b) => {
          return parseFloat(a.dist) - parseFloat(b.dist);
        });
      }
      setVisibleList(tmp);
    },
    [GPSLoc, setVisibleList]
  );

  useEffect(() => {
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
  }, [setGPSLoc, setCenterLoc, setMarker]);

  return (
    <Layout>
      <FridgeList setCenterLoc={setCenterLoc} visibleList={visibleList} />
      <MapComponent
        centerLoc={centerLoc}
        setCenterLoc={setCenterLoc}
        visibleList={visibleList}
        setVisibleListInBoundary={setVisibleListInBoundary}
        marker={marker}
        setMarker={setMarker}
      />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_NAME}/api/v1/fridge/all`
  );

  const res = data.data;
  return {
    props: {
      res,
    },
  };
};

export default Map;
