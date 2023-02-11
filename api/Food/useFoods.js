import { axiosInstance } from 'api/axiosInstance';

export const usePostFoods = () => {
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
