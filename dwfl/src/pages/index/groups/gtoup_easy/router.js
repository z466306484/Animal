export default {
  path: '/gtoup_easy',
  component: r =>  require.ensure([], () => r(require('./gtoup_easy.vue')), 'gtoup_easy'),
};
