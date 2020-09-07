export default {
  path: '/san_advert_add',
  component: r =>  require.ensure([], () => r(require('./san_advert_add.vue')), 'san_advert_add'),
};
