export default {
  path: '/san_material_answer_show',
  component: r =>  require.ensure([], () => r(require('./san_material_answer_show.vue')), 'san_material_answer_show'),
};
