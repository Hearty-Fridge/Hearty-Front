import Header from '@components/Header';
import Head from 'next/head';
import styled from 'styled-components';

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Head>
        <title>Hearty Fridge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  // header를 fixed 로 변경하여 header의 높이만큼 padding-top 부여
  padding: 86px 80px 0;
`;

export default Layout;
