export default {
  path: '/authorization',
  component: r =>  require.ensure([], () => r(require('./authorization.vue')), 'authorization'),
};
