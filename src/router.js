import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import VueTable from './views/VueTable.vue'
import Info from './views/Info.vue'
import TableDemo from './components/TableDemo.vue'
import NavDemo from './views/NavDemo';
import quiNav from './components/quiNav';
import NavMenu from './components/NavMenu';
import VueTabTable from './views/VueTabTable';
import MarkDownEditer from './components/MarkDownEditer';
import CustomRecord from './views/CustomRecord';
import editor from './views/editor';

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
      path: '/navDemo',
      name: 'navDemo',
      component: NavDemo
    },
    {
      path: '/quiNav',
      name: 'quiNav',
      component: quiNav
    },
    {
      path: '/markDownEditer',
      name: 'markDownEditer',
      component: MarkDownEditer
    },
    {
      path: '/vueTable',
      name: 'vueTable',
      component: VueTable
    },
    {
      path: '/vueTabTable',
      name: 'vueTabTable',
      component: VueTabTable
    },
    {
      path: '/customRecord',
      name: 'customRecord',
      component: CustomRecord
    },
    {
      path: '/navMenu',
      name: 'navMenu',
      component: NavMenu
    },
    {
      path: '/editor',
      name: 'editor',
      component: editor
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
