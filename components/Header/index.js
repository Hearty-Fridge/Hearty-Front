import Link from 'next/link';
import { useMemo, useEffect, useState } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { userState } from 'atoms/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getZIndex } from '@styles/zIndex';
import { axiosInstance } from 'api';
import { AiFillBell, AiFillMail } from 'react-icons/ai';

const NAV_MENU = ['Intro', '|', 'Map'];
const TOKEN_KEY = 'accessToken';

const Header = () => {
  const [curUserData, setCurUserData] = useRecoilState(userState);
  const resetUserData = useSetRecoilState(userState);
  const [token, setToken] = useState(null);
  // recoil 써서 나중에 전역으로 관리하자!
  // const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useRouter();
  const currentPath = useMemo(() => pathname.replace('/', ''), [pathname]);

  const handleSuccess = async (accessToken) => {
    try {
      const res = await axios.post(`/api/v1/member/googleLogin`, {
        accessToken: accessToken,
      });

      setCurUserData({
        memberId: res.data.memberId,
        isLogin: true,
        name: res.data.name,
        email: res.data.email,
        profileImage: res.data.profileImage,
      });

      localStorage.setItem(TOKEN_KEY, res.data.accessToken);
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

  const handleLogout = () => {
    localStorage.clear();
    resetUserData([]);
  };

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
  }, [curUserData]);

  return (
    <StyledHeader>
      <Navigation>
        <Link href="/">
          <Image src="/image/HFogo.png" alt="logo" width={145} height={111} />
        </Link>
        {NAV_MENU.map((navMenu) => (
          <NavLink
            key={navMenu}
            selected={currentPath === navMenu.toLowerCase()}
            href={token ? `/${navMenu.toLowerCase()}` : ''}
            onClick={() => {
              token ? '' : alert('please Login');
            }}
          >
            {navMenu}
          </NavLink>
        ))}
      </Navigation>
      <InfoArea>
        {curUserData.isLogin ? (
          <>
            <Bell>
              <AiFillBell className="icon" color="#594C48" />
            </Bell>
            <LogOutButton onClick={handleLogout}>Log out</LogOutButton>
            <MyPageButton href="/mypage">My</MyPageButton>
          </>
        ) : (
          <>
            <LogInButton onClick={login}>Log in</LogInButton>
          </>
        )}
      </InfoArea>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  padding: 0 80px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 111px;
  align-items: center;
  justify-content: space-between;
  z-index: ${getZIndex('header')};
  background-color: #ffffff;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  font-size: 20px;
  column-gap: 33px;
`;

const Logo = styled.div`
  margin-right: 33px;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.palette.secondary.main};
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
  font-size: 18px;
  column-gap: 48px;
  .icon {
    width: 36px;
    height: 36px;
  }
`;

const LinkButtonStyle = css`
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16.5px 28px;
  border-radius: 100px;
`;

const LogInButton = styled.button`
  ${LinkButtonStyle};
  cursor: pointer;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.palette.accent};
`;

const Bell = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  background-color: rgba(255, 0, 0, 0);
`;

const LogOutButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  color: ${({ theme }) => theme.palette.gray};
  background-color: rgba(255, 0, 0, 0);
`;

const MyPageButton = styled(Link)`
  ${LinkButtonStyle}
  cursor: pointer;
  min-width: 92.32px;
  outline: none;
  border: none;
  font-size: 14px;
  background-color: ${({ theme }) => theme.palette.primary};
`;
