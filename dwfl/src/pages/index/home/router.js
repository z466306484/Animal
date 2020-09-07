export default {
  path: '/home',
  component: r =>  require.ensure([], () => r(require('./index.vue')), 'home'),
};
