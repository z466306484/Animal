export default {
  path: '/herssend',
  component: r =>  require.ensure([], () => r(require('./herssend.vue')), 'herssend'),
};
