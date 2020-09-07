export default {
  path: '/san_user_disabledlist',
  component: r =>  require.ensure([], () => r(require('./san_user_disabledlist.vue')), 'san_user_disabledlist'),
};
