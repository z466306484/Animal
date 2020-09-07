export default {
  path: '/san_material_recover_show',
  component: r =>  require.ensure([], () => r(require('./san_material_recover_show.vue')), 'san_material_recover_show'),
};
