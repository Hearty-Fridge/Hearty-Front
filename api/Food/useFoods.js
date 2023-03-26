import { axiosInstance } from 'api/axiosInstance';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import axios from 'axios';

const giveFood = async ({ body, token }) => {
  console.log(token);
  console.log(body);
  if (!token) {
    return { isLoading: false, error: 'Access token is missing' };
  }
  await axiosInstance.post('/give/giveFood', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const takeFood = async ({ giveId, token }) => {
  if (!token) {
    return { isLoading: false, error: 'Access token is missing' };
  }
  const result = await axiosInstance
    .request({
      method: 'POST',
      url: `/take/takeFood?giveId=${giveId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((e) => {
      return { error: e.response.data.message };
    });

  return result;
};

export const useFoodsMutation = ({ fridgeId }) => {
  // mutation 성공 후 `useTodosQuery`로 관리되는 서버 상태를 다시 불러오기 위한
  // Cache 초기화를 위해 사용될 queryClient 객체
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: giveFood,
    // mutate 요청이 성공한 후 queryClient.invalidateQueries 함수를 통해
    // useTodosQuery에서 불러온 API Response의 Cache를 초기화
    onSuccess: () => {
      queryClient.invalidateQueries(['fridges']);
      queryClient.invalidateQueries(['fridgesById', fridgeId.toString()]);
    },
    onMutate: async (newData) => {
      let obj = {};
      for (const [key, value] of newData.body.entries()) {
        obj[key] = value;
      }
      const [fridgesQueryKey, fridgeQueryKey] = [
        ['fridges'],
        ['fridgesById', fridgeId.toString()],
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
      fridgeData.foodList.push({
        giveId: -1,
        giveTime: new Date(),
        food: {
          id: -1,
          name: obj.name,
          category: obj.category,
          message: obj.message,
          amount: obj.amount,
          expiration: obj.expiration,
        },
        fridgeName: fridgeData.fridgeInfo.fridgeName,
        isReserved: false,
      });
      fridgeData.messageList.push({
        giveId: -1,
        message: obj.message,
        messageId: -1,
        sendTime: new Date(),
      });
      fridgesData.fridgeList[fridgeId - 1].numFoods += 1;
      fridgesData.fridgeList[fridgeId - 1].numMessages += 1;

      queryClient.setQueryData(fridgesQueryKey, fridgesData);
      queryClient.setQueryData(fridgeQueryKey, fridgeData);

      return { previousData };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(['fridges'], context.previousData.fridges);
      queryClient.setQueryData(
        ['fridgesById', fridgeId],
        context.previousData.fridge
      );
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(['fridges']);
      queryClient.invalidateQueries(['fridgesById', fridgeId]);
    },
  });
};

export const getFoodImageById = ({ giveId, token }) => {
  if (!token) {
    return { isLoading: false, error: 'Access token is missing' };
  }
  return useQuery(
    ['foodImage', giveId],
    async () => {
      if (giveId === undefined) {
        return 0;
      }
      const { data } = await axiosInstance.request({
        method: 'GET',
        url: `/image/findImagesByGive?giveId=${giveId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export const getCanReserve = ({ token }) => {
  if (!token) {
    return { isLoading: false, error: 'Access token is missing' };
  }
  return useQuery(
    ['numCanReserve'],
    async () => {
      const { data } = await axiosInstance.request({
        method: 'GET',
        url: '/take/numNotDone',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return 2 - data.data;
    },
    {
      onError: (e) => {
        console.error(e);
      },
    }
  );
};
