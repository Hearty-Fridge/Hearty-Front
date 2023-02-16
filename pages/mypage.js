import Layout from '@components/Layout';
import MyData from '@components/Mypage';
import { axiosInstance } from 'api';
import { userState } from 'atoms/user';
import { useRecoilState } from 'recoil';

export const getUserData = async () => {
  const [userData, setUserData] = useRecoilState(userState);
  const data = await axiosInstance.get(`/member/getProfile`, {
    id: userData.id,
  });

  const res = data.data;
  return {
    props: {
      res,
    },
  };
};

const MyPage = ({ res }) => {
  return (
    <Layout>
      <MyData datas={res} />
    </Layout>
  );
};

export default MyPage;
