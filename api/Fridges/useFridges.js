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

      var idx = 0;
      for (let i = 0; i < data.data.fridgeList.length; ++i) {
        if (idx === data.data.bookmarks.length) {
          data.data.fridgeList[i].isBookmarked = false;
        } else {
          data.data.fridgeList[i].isBookmarked =
            data.data.fridgeList[i].fridgeInfo.fridgeId ===
            data.data.bookmarks[idx];
          if (
            data.data.fridgeList[i].isBookmarked &&
            idx != data.data.bookmarks.length - 1
          ) {
            idx += 1;
          }
        }
      }
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
