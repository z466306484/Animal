export default {
  path: '/Information_details',
  component: r =>  require.ensure([], () => r(require('./Information_details.vue')), 'Information_details'),
};
