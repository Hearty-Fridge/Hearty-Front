import { axiosInstance } from 'api/axiosInstance';
import { useMutation, useQueryClient } from 'react-query';

const fetcher = (body) =>
  axiosInstance.request({
    method: 'POST',
    url: '/give/giveFood',
    data: body,
  });

const useFoodsMutation = () => {
  // mutation 성공 후 `useTodosQuery`로 관리되는 서버 상태를 다시 불러오기 위한
  // Cache 초기화를 위해 사용될 queryClient 객체
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetcher,
    // mutate 요청이 성공한 후 queryClient.invalidateQueries 함수를 통해
    // useTodosQuery에서 불러온 API Response의 Cache를 초기화
    // onSuccess: () => queryClient.invalidateQueries('giveFood'),
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['giveFood'] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(['giveFood']);

      // Optimistically update to the new value
      queryClient.setQueryData(['giveFood'], (old) => [...old, newData]);

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(['giveFood'], context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['giveFood'] });
    },
  });
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
