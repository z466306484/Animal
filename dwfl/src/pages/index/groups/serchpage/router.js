export default {
  path: '/serchpage',
  component: r =>  require.ensure([], () => r(require('./serchpage.vue')), 'serchpage'),
};
