export default {
  path: '/myinfo',
  component: r =>  require.ensure([], () => r(require('./myinfo.vue')), 'myinfo'),
};
