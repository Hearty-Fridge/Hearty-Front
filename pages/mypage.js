import Layout from '@components/Layout';
import MypageComponent from '@components/Mypage';
// import { axiosInstance } from 'api';
// import { userState } from 'atoms/user';
// import { useRecoilState } from 'recoil';

// api 연동
// export const getUserData = async () => {
//   const [userData, setUserData] = useRecoilState(userState);
//   const data = await axiosInstance.get(`/member/getProfile`, {
//     id: userData.id,
//   });

//   const res = data.data;
//   return {
//     props: {
//       res,
//     },
//   };
// };

const MyPage = ({ res }) => {
  return (
    <Layout>
      <MypageComponent />
    </Layout>
  );
};

export default MyPage;
