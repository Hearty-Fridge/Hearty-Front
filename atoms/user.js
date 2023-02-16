const { atom } = require('recoil');

export const userState = atom({
  key: 'userState',
  default: {
    id: 0,
    isLogin: false,
    email: '',
    name: '',
    profileImage: '',
  },
});
