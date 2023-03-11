import Header from '@components/Header';
import Head from 'next/head';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  // url이 map이면 Wrapper 스타일 안넣기
  const { pathname } = useRouter();

  return (
    <Wrapper css={pathname.split('/')[1] === 'map' ? null : WrapperStyle}>
      <Head>
        <title>Hearty Fridge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <FlexContainer>{children}</FlexContainer>
    </Wrapper>
  );
};

const WrapperStyle = css`
  padding: 112px 80px 0;
`;

const Wrapper = styled.div`
  // header를 fixed 로 변경하여 header의 높이만큼 padding-top 부여
  padding-top: 112px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-basis: fit-content;
`;

export default Layout;
