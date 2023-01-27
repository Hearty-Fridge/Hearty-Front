import Layout from '@components/Layout';
import MapComponent from '@components/Map';
import {axiosInstance} from '../api'

const Map = ({ res }) => {
  return (
    <Layout>
      <MapComponent mark={res} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const data = await axiosInstance.get(
    `/fridge/all`
  );

  const res = data.data;
  return {
    props: {
      res,
    },
  };
};

export default Map;
