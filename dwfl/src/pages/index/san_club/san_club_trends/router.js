export default {
  path: '/san_club_trends',
  component: r =>  require.ensure([], () => r(require('./san_club_trends.vue')), 'san_club_trends'),
};
