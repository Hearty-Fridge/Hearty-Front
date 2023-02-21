import axios from 'axios';
import { axiosInstance } from 'api/axiosInstance';
import { useQuery } from 'react-query';
import { useQueryClient, useMutation } from 'react-query';

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
      refetchOnWindowFocus: true,
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

const addBookmark = ({ memberId, fridgeId, state }) => {
  if (state) {
    return axiosInstance.request({
      method: 'DELETE',
      url: `/bookmark/delBookmark?memberId=${memberId}&fridgeId=${fridgeId}`,
    });
  } else {
    return axiosInstance.request({
      method: 'POST',
      url: `/bookmark/addBookmark?memberId=${memberId}&fridgeId=${fridgeId}`,
    });
  }
};

export const useBookmarkMutation = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBookmark,
    // mutate 요청이 성공한 후 queryClient.invalidateQueries 함수를 통해
    // useTodosQuery에서 불러온 API Response의 Cache를 초기화

    // onMutate는 addBookmark가 실행되기 전에 실행됨.
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['fridges', id] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(['fridges', id]);

      const data = previousData;
      data.fridgeList[parseInt(newData.fridgeId)].isBookmark =
        !data.fridgeList[parseInt(newData.fridgeId)].isBookmark;
      // Optimistically update to the new value
      queryClient.setQueryData(['fridges', id], data);

      // Return a context object with the snapshotted value
      // 얘는 에러가 났을 때 onError의 context로 들어감.
      return { previousData };
    },
    onError: (err, newData, context) => {
      console.log(err);
      queryClient.setQueryData(['fridges', id], context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['fridges', id] });
    },
  });
};
