export default {
  path: '/guanyu',
  component: r =>  require.ensure([], () => r(require('./guanyu.vue')), 'guanyu'),
};
