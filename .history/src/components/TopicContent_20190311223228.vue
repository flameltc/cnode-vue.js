<template>
  <div class="topicCon" ref="topicContent" @scroll="showGoTop($event)">
    <div class="contentBlock">
      <h3 class="title">{{ topicContent.title }}</h3>
      <div class="infoWrapper content">
        <div class="info">
          <router-link class="user" :to="{name: 'UserInfo', params: {loginname: topicContent.author && topicConetnt.author.loginname}}" v-if="topicContent.author && topicConetnt.author.loginname">
            <div class="avatar">
              <img :src="topicContent.author && topicContent.author.avatar_url">
            </div>
            <span>{{ topicContent.author && topicContent.author.loginname }}</span>
          </router-link>
          <span>{{ topicContent.create_at | dateFormat }}</span>
          <span>{{ types[topicContent.tab] }}</span>
          <span>{{ topicContent.reply_count + '/' + topicContent.visit_count }}</span>
        </div>
        <div class="operation">
          <i class="iconfont incon-comment" @click="focusComment"></i>
          <i class="iconfont" :class="{'icon-collection-active': topicContent.is_collect, 'icon-collection': !topicContent.is_collection}" @click="handleCollection"></i>
        </div>
      </div>
      <div v-html="topicContent.content"></div>
    </div>
    <div class="replyBlock">
      <span class="count">{{ topicContent.reply_count }}条回复</span>
      <ul>
        <li v-for="(reply, index) of topicContent.replies" class="replyCell" :key="index">
          <div class="infoWrapper reply">
            <div class="info">
              <router-link class="user" :to="{name: 'UserInfo', params: {loginname: reply.author.loginname}}" v-if="reply.author.loginname">
                <div class="avatar">
                  <img :src="reply.author.avatar_url">
                </div>
                <span>{{ reply.author.loginname }}</span>
              </router-link>
              <span>{{ reply.create_at | dateFormat }}</span>
              <span>{{ index + 1 }}楼</span>
            </div>
            <div class="operation">
              <i class="iconfont icon-reply" @click="handleReply(index)"></i>
              <i class="iconfont" :class="{'icon-up-active': reply.is_uped, 'icon-up': !reply.is_uped}" @click="handleUp(reply)"></i>
              <span>{{ reply.ups.length }}</span>
            </div>
          </div>
          <div v-html="reply.content"></div>
          <div class="inputBlock reply" v-show="currentReplyIndex === index">
            <input type="text" placeholder="请输入回复" ref="reply" v-model="replyContent">
            <div class="operation">
              <mt-button type="primary" size="small" @click="commentReply(reply)">回复</mt-button>
              <mt-button size="small" @click="handleReply(-1)">取消</mt-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="inputBlcok comment">
      <textarea placeholder="请输入评论" ref="comment" v-model="commentContent"></textarea>
      <div class="operation">
        <mt-button type="primary" size="small" @click="commentOrReply('')">评论</mt-button>
      </div>
    </div>
    <div class="goTop" v-if="isShowGoTop" @click="goTop()">
      <img src="../assets/gotop.png">
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TopicContent',
  data() {
    return {
      id: this.$router.params.id,
      topicContent: {
        reply_count: 0,
        visit_count: 0
      },
      commentContent: '',
      replyContent: '',
      currentReplyIndex: null,
      isShowGoTop: false
    }
  },
  created() {
    this.getTopicContent()
  },
  beforeRouteUpdate(to, from, next) { // 响应路由参数的变化
     next()
     this.id = this.$router.params.id
     this.getTopicContent
  },
  computed: {
    ...mapState([
      'accessToken',
      'userInfo',
      'types'
    ])
  },
  methods: {
    ...mapMutations([
      'handleBack',
      'handleUserLogin'
    ]),
    // 获取主题内容
    getTopicContent() {
      this.handleBack({isShowBack: true})
      this.$indicator.open()
    }
  }
}
</script>
