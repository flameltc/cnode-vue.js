import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import vueAxios from 'vue-axios'
// import moment from 'moment'
import utils from './utils/index'

Vue.use(Vuex)
Vue.use(MintUI)
Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
