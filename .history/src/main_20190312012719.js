import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import vueAxios from 'vue-axios'
import moment from 'moment'
import utils from './utils/index'

Vue.use(MintUI)
Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.prototype.$axios = axios

// 日期格式化
Vue.filter('dateFormat', function (value) {
  if (!value) return ''
  return moment(value).fromNow().replace(/\s/g, '').replace(/\ban?/, '1').replace('fewseconds', '分钟').replace(/minutes?/, '分钟').replace(/hours?/, '小时').replace(/days?/, '天').replace(/months?/, '个月').replace(/years?/, '年').replace('ago', '前')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
