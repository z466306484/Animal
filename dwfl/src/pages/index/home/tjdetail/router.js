export default {
  path: '/tjdetail',
  component: r =>  require.ensure([], () => r(require('./tjdetail.vue')), 'tjdetail'),
};
