import Layout from '@components/Layout';
import MypageComponent from '@components/Mypage';
import styled from 'styled-components';
import Header from '@components/Header';

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
