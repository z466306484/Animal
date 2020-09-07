export default {
  path: '/san_material_recover',
  component: r =>  require.ensure([], () => r(require('./san_material_recover.vue')), 'san_material_recover'),
};
