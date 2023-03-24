import { useGoogleLogin } from '@react-oauth/google';
import { axiosInstance } from 'api';
import { userState } from 'atoms/user';
import axios from 'axios';
import { headers } from 'next.config';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

const TOKEN_KEY = 'accessToken';

export function useLogin() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const [curUserData, setCurUserData] = useRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem(TOKEN_KEY)) {
        axiosInstance
          .get('/member/testToken', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            },
          })
          .then(() => {
            setIsLogin(true);
          })
          .catch(() => {
            if (router.pathname.split('/')[1] !== '') {
              router.push('/');
            }
            alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
            handleLogout();
          });
      }
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
        const { data } = await axiosInstance.post(`/member/googleLogin`, {
          accessToken: accessToken,
        });
        const user = {
          memberId: data.memberId,
          name: data.name,
          email: data.email,
          profileImage: data.profileImage,
        };
        setCurUserData(user);
        localStorage.setItem(TOKEN_KEY, data.accessToken);
        setIsLogin(true);
      } catch (error) {
        console.error('error: ', error);
      }
    },
  });

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    resetUserState();
    setIsLogin(false);
  };

  return { isLogin, handleLogin, handleLogout };
}
