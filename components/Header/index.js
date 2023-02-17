import Link from 'next/link';
import { useMemo } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { userState } from 'atoms/user';
import { useRecoilState } from 'recoil';
import { getZIndex } from '@styles/zIndex';

const NAV_MENU = ['Intro', '|', 'Map', '|', 'Donating'];
const TOKEN_KEY = 'accessToken';

const Header = () => {
  const [curUserData, setCurUserData] = useRecoilState(userState);
  // recoil 써서 나중에 전역으로 관리하자!
  // const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useRouter();
  const currentPath = useMemo(() => pathname.replace('/', ''), [pathname]);

  const handleSuccess = async (accessToken) => {
    try {
      const res = await axios.post(`/member/googleLogin`, {
        accessToken: accessToken,
      });
      console.log('성공', res);

      setCurUserData({
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

  return (
    <StyledHeader>
      <Navigation>
        <Logo>
          <Link href="/">
            <Image src="/image/Logo.png" width={145} height={111} />
          </Link>
        </Logo>
        {NAV_MENU.map((navMenu) => (
          <>
            <NavLink
              key={navMenu}
              selected={currentPath === navMenu.toLowerCase()}
              href={`/${navMenu.toLowerCase()}`}
            >
              {navMenu}
            </NavLink>
            {/* <Bar>|</Bar> */}
          </>
        ))}
      </Navigation>
      <InfoArea>
        {curUserData.isLogin ? (
          <>
            <div>
              <Image
                src="/image/message.png"
                width={36}
                height={36}
                alt="message"
              />
            </div>
            <div>
              <Image
                src="/image/alarm.png"
                width={36}
                height={36}
                alt="alarm"
              />
            </div>
            <MyPageButton href="/mypage">My</MyPageButton>
          </>
        ) : (
          <>
            <LogInButton onClick={login}>Login</LogInButton>
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
  background-color: ${({ theme }) => theme.palette.background};
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

const Bar = styled.div`
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const InfoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 18px;
  column-gap: 48px;
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

const MyPageButton = styled(Link)`
  ${LinkButtonStyle}
  min-width: 107px;
  background-color: ${({ theme }) => theme.palette.primary};
`;
