<template>
  <div class="userInfo">
    <div class="cell user">
      <div class="avatar">
        <img :src="userInfo.avatar_url">
      </div>
      <div class="inf">
        <span>用户名：{{ userInfo.loginname }}</span>
        <span>github:<a :href="`http://github.com/${userInfo.githubUsername}`" target="_blank">{{ userInfo.githubUsername }}</a></span>
        <span>积分：{{ userInfo.score }}</span>
        <span>注册于{{ userInfo.create_at && userInfo.create_at.substr(0,10) }}</span>
      </div>
    </div>
    <div>
      <div class="cell topic">
        <span class="title">最近创建的话题</span>
        <ul>
          <li v-for="(topic, index) of userInfo.recent_topics" :key="index"><router-link :to="{name: 'TopicContent', params: {id: topic.id}}">{{ topic.title }}</router-link></li>
        </ul>
      </div>
      <div class="cell reply">
        <span class="title">最近参与的话题：</span>
        <ul>
          <li v-for="(reply, index) of userInfo.recent_replies" :key="index"><router-link :to="{name: 'TopicContent', params: {id: reply.id}}">{{ reply.title }}</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'UserInfo',
  data() {
    return {
      loginname: this.$router.params.loginname,
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  beforeRouteUpdate(to, form, next) { // 响应路由参数的变化，获取对应用户
    next()
    this.loginname = this.$router.params.loginname
    this.getUserInfo()
  },
  methods: {
    ...mapMutations([
      'handleBack'
    ]),
    // 获取用户信息
    getUserInfo() {
      this.handleBack({isBack: true}) // 显示返回按钮
      this.$indicator.open({
        spinnerType: 'double-bounce'
      })
      this.$axios.get(`https://cnodejs.org/api/v1/user/`)
    }
  }
}
</script>
