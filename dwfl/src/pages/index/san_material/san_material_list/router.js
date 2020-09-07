export default {
  path: '/san_material_list',
  component: r =>  require.ensure([], () => r(require('./san_material_list.vue')), 'san_material_list'),
};
