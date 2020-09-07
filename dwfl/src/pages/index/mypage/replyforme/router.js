export default {
  path: '/replyforme',
  component: r =>  require.ensure([], () => r(require('./replyforme.vue')), 'replyforme'),
};
