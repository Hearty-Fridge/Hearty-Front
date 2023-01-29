import Link from 'next/link';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
const NAV_MENU = ['Intro', 'Map', 'Donating'];
import { useGoogleLogin } from '@react-oauth/google';
import { axiosInstance } from '../../api';
import axios from 'axios';
const TOKEN_KEY = 'accessToken';

const Header = () => {
  // recoil 써서 나중에 전역으로 관리하자!
  const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useRouter();
  const currentPath = useMemo(() => pathname.replace('/', ''), [pathname]);

  const handleSuccess = async (accessToken) => {
    try {
      const res = await axios.post(`/member/googleLogin`, {
        accessToken: accessToken,
      });
      console.log('성공', res);
      localStorage.setItem(TOKEN_KEY, res.data.accessToken);
      setIsLogin(true);
    } catch (error) {
      console.error('error: ', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleSuccess(tokenResponse.access_token);
    },
    // flow: 'auth-code',
  });

  return (
    <TopWrapper>
      <Navigation>
        <Link href="/">
          <Image src="/image/Logo.png" width={145} height={111} />
        </Link>
        {NAV_MENU.map((navMenu) => (
          <NavLink
            key={navMenu}
            selected={currentPath === navMenu.toLowerCase()}
            href={`/${navMenu.toLowerCase()}`}
          >
            {navMenu}
          </NavLink>
        ))}
      </Navigation>
      <InfoArea>
        {isLogin ? (
          <>
            <div>
              <Image
                src="/image/message.png"
                width={36}
                height={36}
                alt="message"
                className="icons"
              />
            </div>
            <div>
              <Image
                src="/image/alarm.png"
                width={36}
                height={36}
                alt="alarm"
                className="icons"
              />
            </div>
            <div className="mypage">My</div>
          </>
        ) : (
          <>
            <div className="signup" onClick={() => login()}>
              Login
            </div>
          </>
        )}
      </InfoArea>
    </TopWrapper>
  );
};

export default Header;

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 137px;
  align-items: center;
  justify-content: space-between;
`;

const Navigation = styled.nav`
  display: flex;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 24px;
  div {
    margin-left: 80px;
  }
  a {
    margin-right: 80px;
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const NavLink = styled(Link)`
  ${({ selected }) =>
    selected &&
    css`
      font-weight: 800;
    `};
`;

const InfoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  font-size: 18px;
  .icons {
    margin-right: 48px;
  }
  .signup {
    color: white;
    width: 107px;
    text-align: center;
    border-radius: 18px;
    padding: 10px;
    background-color: ${(props) => props.theme.palette.accent};
  }
  .mypage {
    color: white;
    width: 107px;
    text-align: center;
    border-radius: 18px;
    padding: 10px;
    background-color: ${(props) => props.theme.palette.primary};
  }
`;
