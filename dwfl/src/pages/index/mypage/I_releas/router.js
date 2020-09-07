export default {
  path: '/I_releas',
  component: r =>  require.ensure([], () => r(require('./I_releas.vue')), 'I_releas'),
};
