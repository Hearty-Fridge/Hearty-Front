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

export const getFridgesById = ({ fridgeId, memberId }) => {
  return useQuery(
    ['fridgesById', fridgeId, memberId],
    async () => {
      if (fridgeId === undefined || fridgeId === null) {
        return 0;
      }
      const { data } = await axiosInstance.request({
        method: 'GET',
        url: `/fridge/getFridge2?fridgeId=${fridgeId}&memberId=${memberId}`,
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

export const addBookmark = ({ memberId, fridgeId, state }) => {
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

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['fridges', id] });

      const previousData = queryClient.getQueryData(['fridges', id]);

      const data = previousData;
      data.fridgeList[parseInt(newData.fridgeId)].isBookmark =
        !data.fridgeList[parseInt(newData.fridgeId)].isBookmark;
      queryClient.setQueryData(['fridges', id], data);

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
