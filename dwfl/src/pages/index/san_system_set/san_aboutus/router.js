export default {
  path: '/san_aboutus',
  component: r =>  require.ensure([], () => r(require('./san_aboutus.vue')), 'san_aboutus'),
};
