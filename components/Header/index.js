import Link from 'next/link';
import { TopWrapper, Navigation, InfoArea } from './styles';

import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { axiosInstance } from '../../api';
import axios from 'axios';
import { userState } from 'atoms/user';
import { useRecoilState } from 'recoil';

const navMenu = ['Intro', 'Map', 'Donating'];
const TOKEN_KEY = 'accessToken';

const Header = () => {
  const [curUserData, setCurUserData] = useRecoilState(userState);
  // recoil 써서 나중에 전역으로 관리하자!
  // const [isLogin, setIsLogin] = useState(false);

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
    <TopWrapper>
      <Navigation>
        <Link href="/">Logo</Link>
        {navMenu.map((menu, index) => {
          return (
            <Link href={`/${menu.toLowerCase()}`} key={index}>
              {menu}
            </Link>
          );
        })}
      </Navigation>
      <InfoArea>
        {curUserData.isLogin ? (
          <>
            <div>Message</div>
            <div>Alarm</div>
            <div className="signup">My</div>
          </>
        ) : (
          <>
            <div className="signin" onClick={() => login()}>
              Login
            </div>
          </>
        )}
      </InfoArea>
    </TopWrapper>
  );
};

export default Header;
