<template>
  <transition name="bar">
    <div class="slideBar" v-show="isShowSlideBar">
      <div class="container">
        <div class="menu">
          <div @click="showUserLogin">
            <mt-cell class="user" :title="userInfo.loginname || '登录'" is-link>
              <img slot="icon" :src="userInfo.avatar_url || ''" width="22" height="22" v-show="accessToken">
            </mt-cell>
          </div>
          <div @click="showNewTopic">
            <mt-cell title="新建主题" is-link></mt-cell>
          </div>
          <div @click="showUserCollection">
            <mt-cell title="收藏主题" is-link></mt-cell>
          </div>
          <div @click="showMsg">
            <mt-cell title="我的消息" is-link>
              <mt-badge size="small" color="red" v-show="qMsgNum">{{ qMsgNum }}</mt-badge>
            </mt-cell>
          </div>
          <div class="exit" @click="logout" v-if="accessToken">
            <mt-cell title="退出登录"></mt-cell>
          </div>
        </div>
      </div>
      <div class="restPart" @click="hideSlideBar"></div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'SideBar',
  computed: {
    ...mapState([
      'accessToken',
      'userInfo',
      'msgNum',
      'isShowSlideBar'
    ]),
    qMsgNum() {
      return this.msgNum <= 99 ? this.msgNum : '99+'
    }
  },
  created() {
    this.getMsgNum()
  },
  watch: {
    accessToken(val, oldVal) { //监听登录状态，更新未读消息
      this.getMsgNum()
    }
  },
  methods: {
    ...mapMutations([
      'setMsg',
      'handleSlideBar',
      'handleUserLogin',
      'handleNewTopic',
      'handleUserCollection',
      'handleMsg',
      'updateAccessToken',
      'updateUserInfo'
    ]),
    getMsgNum() {
      if(!this.accessToken) {
        this.setMsg({msgNum: 0})
        return
      }
      this.$axios.get(`http://cnode.org/api/v1/message/count?accessToken${this.accessToken}`)
      .then(res => this.setMsg({msgNum: res.data.data}))
      .catch(error => {
        if(error.response)
      })
    }
  }
}
</script>
