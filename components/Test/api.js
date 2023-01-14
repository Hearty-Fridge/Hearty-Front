import axios from 'axios';
import { useQuery } from 'react-query';

const callApi = async () => {
  const res = await axios('/api/hello');
  return res;
};

const useCallApi = () => {
  return useQuery(['Hello'], () => callApi());
};

export { callApi, useCallApi };
