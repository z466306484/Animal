export default {
  path: '/protocol',
  component: r =>  require.ensure([], () => r(require('./protocol.vue')), 'protocol'),
};
