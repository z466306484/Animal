export default {
  path: '/senpage',
  component: r =>  require.ensure([], () => r(require('./senpage.vue')), 'senpage'),
};
