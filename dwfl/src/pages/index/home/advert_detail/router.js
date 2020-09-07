export default {
  path: '/advert_detail',
  component: r =>  require.ensure([], () => r(require('./advert_detail.vue')), 'advert_detail'),
};
