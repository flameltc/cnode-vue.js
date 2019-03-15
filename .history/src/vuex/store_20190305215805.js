import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.accessToken || '',
    userInfo: localStorage.accessToken && 
  }
})