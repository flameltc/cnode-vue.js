<template>
  <transition name="UseL">
    <div class="userLogin" v-show="isShowUserLogin">
      <div class="form">
        <input type="password" placeholder="请输入accessToken" v-model="loginValue">
        <mt-button type="primary" size="large" @click="doLogin">登录</mt-button>
        <mt-button type="danger" size="large" plain @click="hideUserLogin">取消</mt-button>
        <div class="copyright">
          <a href="https://www.google.cn" target="_blank">By</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'userLogin',
  data() {
    return {
      loginValue: ''
    }
  },
  computed: {
    ...mapState([
      'accessToken',
      'userInfo',
      'isShowUserLogin'
    ])
  },
  created() {
    this.loginValue = this.accessToken
  },
  methods: {
    ...mapMutations([
      'updateAccessToken',
      'updateUserInfo',
      'handleUserLogin'
    ]),
    // 登录
    doLogin() {
      if(!this.loginValue) {
        this.$toast('accessToken不能为空')
        return
      }
      this.$axios.post('https://cnodejs.org/api/v1/accesstoken', {accessToken: this.loginValue})
      .then(response => {
        if(response.status == 200) {
          this.$toast('登录成功')
          this.updateAccessToken({accessToken: this.loginValue})
          this.updateUserInfo({userInfo: response.data})
          this.handleUserLogin({isShowUserLogin: false})
          // 存入localStorage
          localStorage.accessToken = this.accessToken
          localStorage.userInfo = this.userInfo
        }
      })
      .catch(error => {
        if(error.response) {
          this.$toast(error.response.data.error_msg)
        }else {
          this.$toast('请求失败，' + error)
        }
      })
    },
    hideUserLogin() {
      this.handleUserLogin({isShowUserLogin: false})
    }
  }
}
</script>

<style lang="scss" scoped>
  .userLogin {
    @include absolute-panel;
    background: $primary-bg;
    
  }
</style>

