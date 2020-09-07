export default {
  path: '/mygroup',
  component: r =>  require.ensure([], () => r(require('./mygroup.vue')), 'mygroup'),
};
