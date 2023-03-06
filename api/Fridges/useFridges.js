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

export const useBookmarkMutation = (fridgeNum, memberId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBookmark,

    onMutate: async (newData) => {
      console.log(newData);
      const [fridgesQueryKey, fridgeQueryKey] = [
        ['fridges', memberId],
        ['fridgesById', fridgeNum.toString(), memberId],
      ];

      const previousData = {
        fridges: queryClient.getQueriesData(fridgesQueryKey),
        fridge: queryClient.getQueriesData(fridgeQueryKey),
      };

      const fridgesData = previousData.fridges[0][1];
      const fridgeData = previousData.fridge[0][1];

      await Promise.all([
        queryClient.cancelQueries(fridgesQueryKey),
        queryClient.cancelQueries(fridgeQueryKey),
      ]);

      const fridgeIndex =
        fridgesData.fridgeList.findIndex(
          (fridge) => fridge.fridgeInfo.fridgeId === newData.fridgeId
        ) + 1;

      if (fridgeIndex >= 1) {
        fridgesData.fridgeList[fridgeIndex].isBookmark = !newData.state;
        queryClient.setQueryData(fridgesQueryKey, fridgesData);
      }

      if (fridgeData) {
        fridgeData.isBookmark = !newData.state;
        queryClient.setQueryData(fridgeQueryKey, fridgeData);
      }

      return { previousData };
    },

    onError: (err, newData, context) => {
      console.log(err);
      queryClient.setQueryData(
        ['fridges', memberId],
        context.previousData.fridges
      );
      queryClient.setQueryData(
        ['fridgesById', fridgeNum, memberId],
        context.previousData.fridge
      );
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(['fridges', memberId]);
      queryClient.invalidateQueries(['fridgesById', fridgeNum, memberId]);
    },
  });
};
