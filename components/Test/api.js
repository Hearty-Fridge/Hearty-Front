import axios from 'axios';
import { useQuery } from 'react-query';

const callApi = async () => {
  const res = await axios('http://localhost:3000/api/hello');
  return res;
};

const useCallApi = () => {
  return useQuery(['Hello'], () => callApi());
};

export { callApi, useCallApi };
