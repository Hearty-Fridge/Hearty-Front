import axios from 'axios';
import { axiosInstance } from 'api/axiosInstance';
import { useQuery } from 'react-query';

export const getAllFridges = () => {
  return useQuery(
    ['fridges'],
    async () => {
      const { data } = await axiosInstance.request({
        method: 'GET',
        url: `/fridge/all`,
      });
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
    ['fridgesById', id],
    async () => {
      const { data } = await axiosInstance.request({
        method: 'GET',
        url: `/fridge/getFridge?id=${id}`,
      });
      return data.data;
    },
    {
      onError: (e) => {
        console.log(e);
      },
    }
  );
};
