export default {
  path: '/san_club_recover',
  component: r =>  require.ensure([], () => r(require('./san_club_recover.vue')), 'san_club_recover'),
};
