import { axiosInstance } from 'api/axiosInstance';
import { useQuery } from 'react-query';
import { useQueryClient, useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { userState } from 'atoms/user';

export const getAllFridges = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return { isLoading: false, error: 'Access token is missing' };
  }
  return useQuery(
    ['fridges'],
    async () => {
      const { data } = await axiosInstance.request({
        method: 'GET',
        url: `/fridge/getAll`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export const getFridgesById = ({ fridgeId }) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return { isLoading: false, error: 'Access token is missing' };
  }
  return useQuery(
    ['fridgesById', fridgeId],
    async () => {
      if (fridgeId === undefined || fridgeId === null) {
        return 0;
      }
      const { data } = await axiosInstance.request({
        method: 'GET',
        url: `/fridge/getFridge2?fridgeId=${fridgeId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export const addBookmark = ({ fridgeId, state }) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return { isLoading: false, error: 'Access token is missing' };
  }
  if (state) {
    return axiosInstance.request({
      method: 'DELETE',
      url: `/bookmark/delBookmark?fridgeId=${fridgeId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return axiosInstance.request({
      method: 'POST',
      url: `/bookmark/addBookmark?fridgeId=${fridgeId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export const useBookmarkMutation = (fridgeNum) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBookmark,

    onMutate: async (newData) => {
      console.log(newData);
      const [fridgesQueryKey, fridgeQueryKey] = [
        ['fridges'],
        ['fridgesById', fridgeNum.toString()],
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
      queryClient.setQueryData(['fridges'], context.previousData.fridges);
      queryClient.setQueryData(
        ['fridgesById', fridgeNum],
        context.previousData.fridge
      );
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(['fridges']);
      queryClient.invalidateQueries(['fridgesById', fridgeNum]);
    },
  });
};
