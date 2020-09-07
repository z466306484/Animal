export default {
  path: '/typepage',
  component: r =>  require.ensure([], () => r(require('./typepage.vue')), 'typepage'),
};
