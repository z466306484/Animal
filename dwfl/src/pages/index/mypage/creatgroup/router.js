export default {
  path: '/creatgroup',
  component: r =>  require.ensure([], () => r(require('./creatgroup.vue')), 'creatgroup'),
};
