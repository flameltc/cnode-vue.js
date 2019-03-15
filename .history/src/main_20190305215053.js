import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './vuex'
// import axios from 'axios'
// import vueAxios from 'vue-axios'
// import moment from 'moment'
import utils from './utils/index'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$utils = utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
