export default {
  path: '/dt_detail',
  component: r =>  require.ensure([], () => r(require('./dt_detail.vue')), 'dt_detail'),
};
