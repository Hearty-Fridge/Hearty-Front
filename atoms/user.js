const { atom } = require('recoil');
import { v1 } from 'uuid';

export const userState = atom({
  //for resolve duplicate key error -> v1 : 난수
  key: `userState/${v1()}`,
  default: {
    memberId: null,
    isLogin: false,
    email: '',
    name: '',
    profileImage: '',
  },
});
