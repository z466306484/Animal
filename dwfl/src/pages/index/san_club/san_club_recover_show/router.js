export default {
  path: '/san_club_recover_show',
  component: r =>  require.ensure([], () => r(require('./san_club_recover_show.vue')), 'san_club_recover_show'),
};
