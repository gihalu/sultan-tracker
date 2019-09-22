import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGoogleApi from 'vue-google-api'
import './quasar'

Vue.config.productionTip = false

const googleApiConfig = {
  apiKey: 'AIzaSyBF7O9LwZUYDeHRUv9wVRMIfM2CFBIXMFo',
  clientId: '528211752834-cmtsp33ed07uc1lfhq92f4q7p11e2vl1.apps.googleusercontent.com',
  scope: 'email profile openid https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets',
}
Vue.use(VueGoogleApi, googleApiConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
