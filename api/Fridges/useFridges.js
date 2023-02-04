import axios from 'axios';
import { useQuery } from 'react-query';

export const getAllFridges = () => {
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

export const getFridgesById = (id) => {
  return useQuery(
    ['fridgesById'],
    async () => {
      const { data } = await axios.get(`/fridge/getFridge?id=${id}`);
      return data.data;
    },
    {
      onError: (e) => {
        console.log(e);
      },
    }
  );
};
