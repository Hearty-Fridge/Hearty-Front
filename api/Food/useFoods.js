import { axiosInstance } from 'api/axiosInstance';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';

const giveFood = (body) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return { isLoading: false, error: 'Access token is missing' };
  }

  // const formData = new FormData();
  // console.log(formData);
  // 이게 되면 아래에서 적용하기!
  axiosInstance.post('/give/giveFood', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

const useFoodsMutation = ({ fridgeId }) => {
  // mutation 성공 후 `useTodosQuery`로 관리되는 서버 상태를 다시 불러오기 위한
  // Cache 초기화를 위해 사용될 queryClient 객체
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: giveFood,
    // mutate 요청이 성공한 후 queryClient.invalidateQueries 함수를 통해
    // useTodosQuery에서 불러온 API Response의 Cache를 초기화
    onSuccess: () => queryClient.invalidateQueries('giveFood'),
    onMutate: async (newData) => {
      let obj = {};
      for (const [key, value] of newData.entries()) {
        obj[key] = value;
      }
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(['giveFood'], context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      console.log('Settled!');
      // queryClient.invalidateQueries({ queryKey: ['giveFood'] });
    },
  });
};

export const getFoodImageById = ({ giveId }) => {
  return useQuery(
    ['foodImage', giveId],
    async () => {
      if (giveId === undefined) {
        return 0;
      }
      const { data } = await axiosInstance.request({
        method: 'GET',
        url: `/image/findImagesByGive?giveId=${giveId}`,
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

export const postFoods = async (body) => {
  const { data } = await axiosInstance.request({
    method: 'POST',
    url: '/give/giveFood',
    data: body,
  });
  return data;
};

export default useFoodsMutation;
