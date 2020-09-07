export default {
  path: '/system_manager',
  component: r =>  require.ensure([], () => r(require('./system_manager.vue')), 'system_manager'),
};
