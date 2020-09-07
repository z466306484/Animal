export default {
  path: '/san_material_answer',
  component: r =>  require.ensure([], () => r(require('./san_material_answer.vue')), 'san_material_answer'),
};
