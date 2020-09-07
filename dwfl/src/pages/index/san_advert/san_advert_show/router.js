export default {
  path: '/san_advert_show',
  component: r =>  require.ensure([], () => r(require('./san_advert_show.vue')), 'san_advert_show'),
};
