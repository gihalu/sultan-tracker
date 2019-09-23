import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGoogleApi from 'vue-google-api'
import { apiConfig, HasValidKey, GetApiKey } from './apiConfig'
import './quasar'

Vue.config.productionTip = false

if (!HasValidKey()) GetApiKey()
Vue.use(VueGoogleApi, apiConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
