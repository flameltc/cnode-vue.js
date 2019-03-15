import * as types from '../types'

const state = {
  initIndex = 0,
  itemTab: [
    { 'title': '全部', 'type': 'all' },
    { 'title': '精华', 'type': 'good' },
    { 'title': '分享', 'type': 'share' },
    { 'title': '问答', 'type': 'ask' },
    { 'title': '招聘', 'type': 'job' },
  ],
  loading: 0,
  leftNavStatus: false,
  topHeaderStatus: true,
}

const action = {
  setNavState({ commit }, status) {
    commit(types.COM_NAV_STATUS, status)
  },
  setHeaderState({ commit }, status) {
    commit(types.COM_HEADER_STATUS, status )
  }
}

const getters = {
  getItemTab: state => state.itemTab,
  loading: state => state.loading,
  setHeaderState: state => state.topHeaderStatus
}

const mutations = {
  [types.COM_LOADING_STATUS](state, state) {
    if(state.loading == 0 && !status) {
      return;
    }
    state.loading = status ? ++state.loading : --state
  }
}