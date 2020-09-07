export default {
  path: '/updatenum',
  component: r =>  require.ensure([], () => r(require('./updatenum.vue')), 'updatenum'),
};
