import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Records from './views/records/Records.vue'
import About from './views/About.vue'
import Sultans from './views/sultans/Sultans.vue'
import Report from './views/report/Report.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'records',
          component: Records
        },
        {
          path: '/about',
          name: 'about',
          component: About
        },
        {
          path: '/report',
          name: 'report',
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
          component: Sultans
        }
      ]
    }
  ]
})
