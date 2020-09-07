export default {
  path: '/savepage',
  component: r =>  require.ensure([], () => r(require('./savepage.vue')), 'savepage'),
};
