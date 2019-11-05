import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import { IsAdmin } from './services/routeGuards'
import DefaultLayout from './layouts/Default.vue'
import Records from './views/records/Records.vue'
import Sultans from './views/sultans/Sultans.vue'
import Report from './views/report/Report.vue'
import Home from './views/Home.vue'

Vue.use(Router)

const AdminGuard: any = IsAdmin(store)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/records',
          name: 'records',
          component: Records
        },
        {
          path: '/report',
          component: Report
        },
        {
          path: '/report/:sultan',
          name: 'report',
          component: Report
        },
        {
          path: '/sultans',
          name: 'sultans',
          component: Sultans,
          beforeEnter: AdminGuard
        }
      ]
    }
  ]
})
