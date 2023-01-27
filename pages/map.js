import FridgeList from '@components/FridgeList';
import Layout from '@components/Layout';
import MapComponent from '@components/Map';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const Map = ({ res }) => {
  const [centerLoc, setCenterLoc] = useState(null);
  const [visibleList, setVisibleList] = useState(res);

  const setVisibleListInBoundary = useCallback(
    ({ minLat, maxLat, minLng, maxLng }) => {
      let tmp = [];
      res.forEach((elem) => {
        if (
          minLat <= elem.lat &&
          elem.lat <= maxLat &&
          minLng <= elem.lng &&
          elem.lng <= maxLng
        ) {
          tmp.push(elem);
        }
      });
      setVisibleList(tmp);
    },
    [setVisibleList]
  );

  return (
    <Layout>
      <FridgeList setCenterLoc={setCenterLoc} visibleList={visibleList} />
      <MapComponent
        centerLoc={centerLoc}
        setCenterLoc={setCenterLoc}
        visibleList={visibleList}
        setVisibleListInBoundary={setVisibleListInBoundary}
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
