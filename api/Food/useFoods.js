import { axiosInstance } from 'api/axiosInstance';
import { useMutation } from 'react-query';

const usePostFoods = () => {
  return useMutation(
    async (body) => {
      const { data } = await axiosInstance.request({
        method: 'POST',
        url: '/give/giveFood',
        data: body,
      });
    },
    {
      onError: (error) => {
        console.error(error.message);
      },
    }
  );
};

export const postFoods = async (body) => {
  const { data } = await axiosInstance.request({
    method: 'POST',
    url: '/give/giveFood',
    data: body,
  });
  return data;
};

export default usePostFoods;
