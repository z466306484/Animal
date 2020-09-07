export default {
  path: '/security',
  component: r =>  require.ensure([], () => r(require('./security.vue')), 'security'),
};
