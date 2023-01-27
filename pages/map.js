import FridgeList from '@components/FridgeList';
import Layout from '@components/Layout';
import MapComponent from '@components/Map';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Map = ({ res }) => {
  const [loc, setLoc] = useState(null);

  // 얘를 Map component에 넣을지 여기에 둘지
  useEffect(() => {
    // geolocation을 사용할 수 있다면
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      // default : 서울 시청
      setLoc({
        lat: 37.330689,
        lng: 126.5930664,
      });
    }
  }, []);

  return (
    <Layout>
      <FridgeList locList={res} setLoc={setLoc} />
      <MapComponent loc={loc} setLoc={setLoc} mark={res} />
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
