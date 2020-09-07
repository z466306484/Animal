export default {
  path: '/san_welcome',
  component: r =>  require.ensure([], () => r(require('./san_welcome.vue')), 'san_welcome'),
};
