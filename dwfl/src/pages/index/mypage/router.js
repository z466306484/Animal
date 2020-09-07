export default {
  path: '/mypage',
  component: r =>  require.ensure([], () => r(require('./mypage.vue')), 'mypage'),
};
