export default {
  path: '/group',
  component: r =>  require.ensure([], () => r(require('./group.vue')), 'group'),
};
