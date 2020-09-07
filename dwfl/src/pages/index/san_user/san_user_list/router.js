export default {
  path: '/san_user_list',
  component: r =>  require.ensure([], () => r(require('./san_user_list.vue')), 'san_user_list'),
};
