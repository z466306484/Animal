export default {
  path: '/san_club_add',
  component: r =>  require.ensure([], () => r(require('./san_club_add.vue')), 'san_club_add'),
};
