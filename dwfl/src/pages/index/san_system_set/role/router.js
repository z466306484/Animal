export default {
  path: '/role',
  component: r =>  require.ensure([], () => r(require('./role.vue')), 'role'),
};
