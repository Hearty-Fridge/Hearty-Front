import Link from 'next/link';
import { useMemo } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { getZIndex } from '@styles/zIndex';
import { AiFillBell } from 'react-icons/ai';
import { useLogin } from '@hooks/useLogin';

import Notification from './Notification';

const Header = () => {
  const { isLogin, handleLogin, handleLogout } = useLogin();

  const { pathname } = useRouter();
  const currentPath = useMemo(() => pathname.replace('/', ''), [pathname]);

  return (
    <StyledHeader>
      <Navigation>
        <Link href="/">
          <Image src="/image/logo.png" alt="logo" width={145} height={145} />
        </Link>
        <NavLink selected={currentPath === 'intro'} href={`/intro`}>
          Intro
        </NavLink>
        <div>|</div>
        <NavLink
          selected={currentPath === 'map'}
          href={isLogin ? `/map` : ''}
          onClick={() => {
            isLogin ? '' : alert('please Login');
          }}
        >
          Map
        </NavLink>
      </Navigation>
      <InfoArea>
        {isLogin ? (
          <>
            <Notification />
            <Link href="/">
              <LogOutButton onClick={handleLogout}>Log out</LogOutButton>
            </Link>
            <MyPageButton href="/mypage">My</MyPageButton>
          </>
        ) : (
          <>
            <LogInButton onClick={handleLogin}>Log in</LogInButton>
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
  /* background-color: #ffffff; */
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  font-size: 20px;
  column-gap: 33px;
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
