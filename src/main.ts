import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGoogleApi from 'vue-google-api'
import { apiConfig } from './apiConfig'
import { IsAuthorized } from './services/routeGuards'
import './quasar'

Vue.config.productionTip = false

const AuthorizationGuard: any = IsAuthorized(store)
router.beforeEach(AuthorizationGuard)

Vue.use(VueGoogleApi, apiConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
