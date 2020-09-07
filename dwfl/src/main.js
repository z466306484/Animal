// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import echarts from 'echarts'
import '../static/icont/font_1120850_v6e44xsed6f/iconfont.css'
import '../static/icont/font_1120850_v6e44xsed6f/iconfont.eot'
import '../static/icont/font_1120850_v6e44xsed6f/iconfont.svg'
import '../static/icont/font_1120850_v6e44xsed6f/iconfont.ttf'
// let VConsole = require('../node_modules/vconsole/dist/vconsole.min');
// let vConsole = new VConsole();
// Vue.use(vConsole);
import $ from 'jquery'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.prototype.apis = 'http://dongwu.siantest.com'
Vue.prototype.docheight = document.documentElement.clientHeight
Vue.prototype.docwidth = document.documentElement.clientWidth

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
