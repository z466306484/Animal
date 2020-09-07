export default {
  path: '/san_club_trends_show',
  component: r =>  require.ensure([], () => r(require('./san_club_trends_show.vue')), 'san_club_trends_show'),
};
