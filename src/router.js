import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import VueTable from './views/VueTable.vue'
import Info from './views/Info.vue'
import TableDemo from './components/TableDemo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/vueTable',
      name: 'vueTable',
      component: VueTable
    },
    {
      path: '/tableDemo',
      name: 'tableDemo',
      component: TableDemo
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
