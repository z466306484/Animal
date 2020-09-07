export default {
  path: '/xieyi',
  component: r =>  require.ensure([], () => r(require('./xieyi.vue')), 'xieyi'),
};
