import axios from 'axios';
import { useQuery } from 'react-query';

const fetchFridges = async () => {
  const { data } = await axios.get(`/fridge/all`);
  console.log('### Fetch Data');
  return data.data;
};

const useFridges = () => {
  return useQuery(['fridges'], () => fetchFridges());
};

export { useFridges, fetchFridges };
