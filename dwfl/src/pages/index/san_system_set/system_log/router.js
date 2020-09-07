export default {
  path: '/system_log',
  component: r =>  require.ensure([], () => r(require('./system_log.vue')), 'system_log'),
};
