import Vue from 'vue'
import Vuex from 'vuex'

// Promise polyfill needed to use Axios with IE
// import Promise from 'es6-promise'
// Promise.polyfill()

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: modules,
  // for dev mode only
  //strict: process.env.DEV
  strict: false
})
