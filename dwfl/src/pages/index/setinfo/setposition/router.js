export default {
  path: '/setposition',
  component: r =>  require.ensure([], () => r(require('./setposition.vue')), 'setposition'),
};
