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
          <i class="iconfont" :class="{'icon-collection-active': topicContent.is_collect, 'icon-collection': !topicContent.is_collect}" @click="handleCollect"></i>
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
      id: this.$route.params.id,
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
     this.id = this.$route.params.id
     this.getTopicContent()
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
      this.$indicator.open({
        spainnerType: 'double-bounce'
      })
      this.$axios.get(`https://cnodejs.org/api/v1/topic/${this.id}`)
      .then(response => {
        this.$indicator.close()
        this.topicContent = response.data.data
      })
      .catch(error => {
        this.$indicator.close()
        if(error.response) {
          this.$toast(error.response.data.error_msg)
        }else {
          this.$toast('请求失败，' + error)
        }
      })
    },
    // 收藏功能
    handleCollect() {
      if(!this.accessToken) {
        this.handleUserLogin({isShowUserLogin: true})
        return
      }
      let _urlStr, _successMsg, _errorMsg
      if(this.topicContent.is_collect) {
        _urlStr = 'de_collect'
        _errorMsg = '取消收藏失败，请稍后再试'
        _successMsg = '取消收藏成功'
      }else {
        _urlStr = 'collect'
        _errorMsg = '收藏失败，请稍后再试'
        _successMsg = '收藏成功'
      }
      this.$axios.post(`https://cnodejs.org/api/v1/topic_collect/${_urlStr}`, {
        accessToken: this.accessToken,
        topic_id: this.topicContent.id,
      })
      .then(response => {
        if(response.data.success) {
          this.topicContent.is_collect = !this.topicContent.is_collect
          this.$toast(_successMsg)
        }else {
          this.$toast(_errorMsg)
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
    // 点赞功能
    handleUp(reply) {
      if(!this.accessToken) {
        this.handleUserLogin({isShowUserLogin: true})
        return
      }
      if(reply.author.loginname === this.userInfo.loginname) {
        this.$toast('不能给自己点赞')
        return
      }
      let _successMsg, _errorMsg
      if(reply.is_uped) {
        _errorMsg = '取消点赞失败，请稍后重试'
        _successMsg = '取消点赞成功'
      }else {
        _errorMsg = '点赞失败，请稍后再试'
        _successMsg = '点赞成功'
      }
      this.$axios.post(`https://cnodejs.org/api/v1/reply/${reply.id}/ups`, {
        accessToken: this.accessToken
      })
      .then(response => {
        if(response.data.success) {
          if(response.data.action === 'up') {
            reply.ups.length++
          }else if(reponse.data.acyion === 'down') {
            reply.ups.length--
          }
          reply.is_uped = !reply.is_uped
          this.$toast(_successMsg)
        }else {
          this.$toast(_errorMsg)
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
    // 回复功能
    handleReply(index) {
      if(index > -1) {
        this.currentReplyIndex = index
        this.$refs.reply[index].focus()
      }else {
        this.replyContent = ''
        this.currentReplyIndex = null
      }
    },
    // 获取评论面板焦点
    focusComment() {
      this.$refs.comment.focus()
    },
    // 评论、回复
    commentOrReply(reply) {
      if(!this.accessToken) {
        this.handleUserLogin({isShowUserLogin: true})
        return
      }
      let _content, _id, _successMsg
      if(reply) { // 评论
        _content = `@${reply.author.loginname} ${this.replyContent}`
        _id = reply.id
      }else { // 回复
        _content = this.commentContent
        _id = ''
      }
      this.$axios.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, {
        accessToken: this.accessToken,
        content: _content,
        reply_id: _id
      })
      .then(response => {
        if(response.data.success) {
          this.getTopicContent() // 重新获取内容
        }
      })
      .then(() => {
        // 初始化
        if(reply) {
          this.replyContent = ''
          this.currentReplyIndex = null
        }else {
          this.commentContent = ''
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
    // 显示返回顶部
    showGoTop(event) {
      if(event.target.scrollTop >= event.target.clientHeight) {
        this.isShowGoTop = true
      }else {
        this.isShowGoTop = false
      }
    },
    // 返回顶部
    goTop() {
      if(this.$refs.topicContent.scrollTop <= 0) {
        return
      }
      let timer = setInterval(() => {
        if(this.$refs.topicContent.scrollTop <= 0) {
          clearInterval(timer)
        }
        this.$refs.topicContent.scrollTop -= 300
      }, 3)
    }
  }
}
</script>

<style lang="scss" scoped>
$primary-size: 20px;
.topicCon {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  text-align: left;
  overflow-x: hidden;
  overflow-y: auto;
  > div {
    width: 100%;
    flex-shrink: 0;
    padding: 0 10px;
    background: $primary-bg;
  }
  .contentBlock {
    margin-top: 10px;
    .title {
      flex: 1;
      margin: 15px 0;
      word-break: break-all;
    }
  }
  .replyBlock {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    .count {
      margin: 15px 0;
      font-size: 12px;
    }
    .replyCell {
      border-bottom: 1px solid $border-color;
      margin-bottom: 15px;
      &:last-child {
        border-bottom: 0 none;
      }
    }
  }
  .infoWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    line-height: $primary-size;
    margin-bottom: 15px;
    &.content {
      margin: 15px 0;
    }
    .info {
      display: flex;
      align-items: center;
      color: $info-color;
      .user {
        display: flex;
        align-items: center;
        .avatar {
          @include rounded-avatar($primary-size);
        }
      }
      span {
        margin-left: 10px;
      }
    }
    .operation {
      display: flex;
      line-height: $primary-size;
      * {
        margin-left: 5px;
      }
      .iconfont {
        width: $primary-size;
        height: $primary-size;
        font-size: $primary-size;
      }
    }
  }
  .inputBlock {
    display: flex;
    flex-direction: column;
    padding: 10px;
    &.comment {
      margin-bottom: 10px;
    }
    textarea {
      height: 75px;
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid $border-color;
      border-radius: 5px;
    }
    input {
      height: 30px;
      width: 100%;
      padding: 0 5px;
      margin-bottom: 10px;
      border: 1px solid $border-color;
      border-radius: 5px;
    }
    .operation {
      text-align: right;
      button {
        padding: 0px 10px;
        margin-left: 10px;
        height: 25px;
      }
    }
  }
  .goTop {
    position: fixed;
    right: 0;
    bottom: 20%;
    width: 30px;
    font-size: 12px;
    border-radius: 5px 0 0 5px;
    background: rgba(38, 162, 255, .7);
    color: rgba(255, 255, 255, .8);
    padding: 10px;
  }
}
</style>

