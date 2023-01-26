import Layout from '@components/Layout';
import MapComponent from '@components/Map';
import axios from 'axios';

const Map = ({ res }) => {
  return (
    <Layout>
      <MapComponent mark={res} />
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
