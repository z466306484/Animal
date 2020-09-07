export default {
  path: '/san_club_list',
  component: r =>  require.ensure([], () => r(require('./san_club_list.vue')), 'san_club_list'),
};
