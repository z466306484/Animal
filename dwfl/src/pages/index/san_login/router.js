export default {
  path: '/san_login',
  component: r =>  require.ensure([], () => r(require('./san_login.vue')), 'san_login'),
};
