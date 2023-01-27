import Link from 'next/link';
import { TopWrapper, Navigation, InfoArea } from './styles';

import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import {axiosInstance} from '../../api';

const navMenu = ['Intro', 'Map', 'Donating'];
const TOKEN_KEY = 'accessToken';


const Header = () => {
  // recoil 써서 나중에 전역으로 관리하자!
  const [isLogin, setIsLogin] = useState(false);
  const handleSuccess = async (accessToken) => {
    try {
      const res = await axiosInstance.post('/member/googleLogin', accessToken);
      console.log('성공', res);
      localStorage.setItem(TOKEN_KEY, accessToken);
      setIsLogin(true);

    } catch (error) {
      console.error(error);
    }
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => 
    {
      handleSuccess(tokenResponse.access_token)
      console.log(tokenResponse)
    }
  })


  return (
    <TopWrapper>
      <Navigation>
        <Link href="/">Logo</Link>
        {navMenu.map((menu, index) => {
          return <Link href={`/${menu.toLowerCase()}`} key={index}>{menu}</Link>;
        })}
      </Navigation>
      <InfoArea>
        {isLogin ? (
          <>
            <div>Message</div>
            <div>Alarm</div>
            <div className="signup">My</div>
          </>
        ) : (
          <>
            <div className="signin" onClick={() => login()}>Login</div>
          </>
        )}
      </InfoArea>
    </TopWrapper>
  );
};

export default Header;
