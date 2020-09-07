export default {
  path: '/san_advert_recover',
  component: r =>  require.ensure([], () => r(require('./san_advert_recover.vue')), 'san_advert_recover'),
};
