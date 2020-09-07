export default {
  path: '/san_club_trends_rocover',
  component: r =>  require.ensure([], () => r(require('./san_club_trends_rocover.vue')), 'san_club_trends_rocover'),
};
