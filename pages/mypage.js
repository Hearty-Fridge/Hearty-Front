import Layout from '@components/Layout';
import MypageComponent from '@components/Mypage';
import styled from 'styled-components';
import Header from '@components/Header';
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
    <MypageWrap>
      <Header />
      <MypageComponent />
    </MypageWrap>
  );
};

const MypageWrap = styled.div`
  padding: 111px 80px;
  height: 100vh;
  background-color: #f8f8f8;
`;

export default MyPage;
