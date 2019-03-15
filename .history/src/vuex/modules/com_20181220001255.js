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

const action 