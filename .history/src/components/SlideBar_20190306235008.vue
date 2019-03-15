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
        if(error.response) {
          this.$toast(error.response.data.error_msg)
        }else {
          this.$toast('请求失败,' + error)
        }
      })
    },
    // 显示用户登录界面
    showUserLogin() {
      if(this.userInfo.success){ // 判断当前登录状态
        this.$router.push({name: 'UserInfo',params: {loginname: this.userInfo.loginname}}) // 登陆状态下显示用户信息
        this.handleSlideBar({isShowSlideBar: false})
        return
      }
      this.handleUserLogin({isShowUserLogin: true})
    },
    // 显示新建主题界面
    showNewTopic() {
      if(!this.accessToken) {
        this.handleUserLogin({isShowUserLogin: true})
        return
      }
      this.handleNewTopic({isShowNewTopic: true})
    },
    // 显示收藏主题界面
    showUserCollection() {
      if(!this.accessToken) {
        this.handleUserLogin({isShowUserLogin: true})
        return
      }
      this.handleUserCollection({isShowUserCollection: true})
    },
    // 显示我的消息界面
    showMsg() {
      if(!this.accessToken) {
        this.handleUserLogin({isShowUserLogin: true})
        return
      }
      this.handleMsg({isShowMsg: true})
    },
    // 退出登陆
    logout() {
      this.$messagebox.confirm('确定退出吗？', '').then(action => {
        this.updateAccessToken({accessToken: ''})
        this.updateUserInfo({userInfo: ''})
        this.
      })
    }
  }
}
</script>
