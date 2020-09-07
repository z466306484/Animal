export default {
  path: '/manager_add',
  component: r =>  require.ensure([], () => r(require('./manager_add.vue')), 'manager_add'),
};
