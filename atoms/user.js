const { atom } = require('recoil');

export const userState = atom({
  key: 'userState',
  default: {
    memberId: null,
    isLogin: false,
    email: '',
    name: '',
    profileImage: '',
  },
});
