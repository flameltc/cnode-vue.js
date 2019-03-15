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
      }
    }
  }
}
</script>

