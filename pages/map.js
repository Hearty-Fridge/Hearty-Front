import MapComponent from '@components/Map';
import axios from 'axios';

const Map = ({ res }) => {
  return <MapComponent mark={res} />;
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
