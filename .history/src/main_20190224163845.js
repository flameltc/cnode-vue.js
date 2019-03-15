import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 
// import api from './api/index'
// import utils from './utils/index'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$utils = utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
