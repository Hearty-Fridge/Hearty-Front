import axios from 'axios';
import { useQuery } from 'react-query';

export const useGetAllFridges = () => {
  return useQuery(
    ['fridges'],
    async () => {
      const { data } = await axios.get(`/fridge/all`);
      console.log(data.data);
      return data.data;
    },
    {
      onError: (e) => {
        console.error(e);
      },
    }
  );
};
