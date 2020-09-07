export default {
  path: '/san_advert_list',
  component: r =>  require.ensure([], () => r(require('./san_advert_list.vue')), 'san_advert_list'),
};
