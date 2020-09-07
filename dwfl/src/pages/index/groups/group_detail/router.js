export default {
  path: '/group_detail',
  component: r =>  require.ensure([], () => r(require('./group_detail.vue')), 'group_detail'),
};
