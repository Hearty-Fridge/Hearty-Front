import MapComponent from '@components/Map';

const Map = ({ res }) => {
  return <MapComponent mark={res} />;
};

export const getStaticProps = async () => {
  const data = await fetch('http://localhost:3000/api/map');
  const res = await data.json();
  return {
    props: {
      res,
    },
  };
};

export default Map;
