export default {
  path: '/san_material_sort',
  component: r =>  require.ensure([], () => r(require('./san_material_sort.vue')), 'san_material_sort'),
};
