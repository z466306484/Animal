export default {
  path: '/san_user_show',
  component: r =>  require.ensure([], () => r(require('./san_user_show.vue')), 'san_user_show'),
};
