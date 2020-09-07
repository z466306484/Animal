export default {
  path: '/role_add',
  component: r =>  require.ensure([], () => r(require('./role_add.vue')), 'role_add'),
};
