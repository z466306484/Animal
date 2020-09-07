import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout/layout'
// import HelloWorld from '@/pages/home/home'
Vue.use(Router)

const routersContext = require.context('@/pages', true, /router\.js$/);
const routersArray = routersContext.keys().map(key => routersContext(key).default);

const routers = [{
  path: '/',
  name: 'layout',
  component: layout,
  redirect: to => {
    return '/san_login';
    // return localStorage.token ? '/main' : '/home';
  },
  children: routersArray,
}, {
  path: '*',
  redirect: '/'
}]
const router = new Router({
  base: '/',
  routes: routers
});
export default router
