export default {
  path: '/san_material_add',
  component: r =>  require.ensure([], () => r(require('./san_material_add.vue')), 'san_material_add'),
};
