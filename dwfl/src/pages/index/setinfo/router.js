export default {
  path: '/setinfo',
  component: r =>  require.ensure([], () => r(require('./setinfo.vue')), 'setinfo'),
};
