import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.accessToken || '',
    // eslint-disable-next-line no-mixed-operators
    userInfo: localStorage.accessToken && JSON.parse(localStorage.userInfo) || {avatar_url: '', id: '', loginname: '', success: false},
    types: {
      all: '全部',
      good: '精华',
      share: '分享',
      ask: '回答',
      job: '招聘',
      dev: '测试'
    },
    activeTab: 'all',
    topics: [],
    page: 1,
    msgNum: 0,
    isShowNewTopic: false,
    isShowUserLogin: false,
    isShowUserCollection: false,
    isShowMsg: false,
    isShowSlideBar: false,
    isShowBack: false,
    isShowGoTop: false
  },
  mutations: {
    updateAccessToken (state, payload) {
      state.accessToken = payload.accessToken
    },
    updateUserInfo (state, payload) {
      state.userInfo = payload.userInfo
    },
    setTopics (state, payload) {
      state.topics = payload.topics
    },
    setTab (state, payload) {
      state.activeTab = payload.activeTab
      state.page = payload.page
      state.topics = payload.topics
    },
    setPage (state, payload) {
      state.page++
    },
    setMsg (state, payload) {
      if (payload) {
        state.msgNum = payload.msgNum
      } else {
        state.msgNum--
      }
    },
    handleNewTopic (state, payload) {
      state.isShowNewTopic = payload.isShowNewTopic
    },
    handleUserLogin (state, payload) {
      state.isShowUserLogin = payload.isShowUserLogin
    },
    handleUserCollection (state, payload) {
      state.isShowUserCollection = payload.isShowUserCollection
    },
    handleMsg (state, payload) {
      state.isShowMsg = payload.isShowMsg
    },
    handleSlideBar (state, payload) {
      state.isShowSlideBar = payload.isShowSlideBar
    },
    handleBack (state, payload) {
      state.isShowBack = payload.isShowBack
    }
  }
})
