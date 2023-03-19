import { useGoogleLogin } from '@react-oauth/google';
import { axiosInstance } from 'api';
import { userState } from 'atoms/user';

import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

const TOKEN_KEY = 'accessToken';

export function useLogin() {
  const [isLogin, setIsLogin] = useState(false);

  const [curUserData, setCurUserData] = useRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLogin(!!localStorage.getItem(TOKEN_KEY));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
    }
  }, [curUserData]);

  const handleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const accessToken = response.access_token;
      try {
        const { data } = await axiosInstance.post('/member/googleLogin', {
          accessToken,
        });
        const user = {
          memberId: data.memberId,
          name: data.name,
          email: data.email,
          profileImage: data.profileImage,
        };
        setCurUserData(user);
        localStorage.setItem(TOKEN_KEY, data.accessToken);
      } catch (error) {
        console.error('error: ', error);
      }
    },
  });

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    resetUserState();
  };

  return { isLogin, handleLogin, handleLogout };
}
