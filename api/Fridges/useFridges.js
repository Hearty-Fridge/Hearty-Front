import axios from 'axios';
import { axiosInstance } from 'api/axiosInstance';
import { useQuery } from 'react-query';

export const getAllFridges = ({ id }) => {
  return useQuery(
    ['fridges', id],
    async () => {
      const { data } = await axiosInstance.request({
        method: 'GET',
        url: `/fridge/getAll?memberId=${id}`,
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
      if (id === undefined || id === null) {
        return 0;
      }
      const { data } = await axiosInstance.request({
        method: 'GET',
        url: `/fridge/getFridge2?fridgeId=${id}`,
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
