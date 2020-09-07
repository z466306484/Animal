export default {
  path: '/san_recover_show',
  component: r =>  require.ensure([], () => r(require('./san_recover_show.vue')), 'san_recover_show'),
};
