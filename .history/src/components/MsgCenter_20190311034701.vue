<template>
  <transition name="pop">
    <div class="msgCenter" v-show="isShowMsg">
      <mt-header class="mHeader" title="消息中心">
        <mt-button icon="back" slot="left" @click="hideMsgCenter"></mt-button>
      </mt-header>
      <mt-navbar class="tab" v-model="active">
        <mt-tab-item id="unread">未读消息<mt-badge type="error" size="small" v-show="msgs.hasnot_read_messages.length">{{ msgs.hasnot_read_message.length }}</mt-badge></mt-tab-item>
        <mt-tab-item id="hasread">已读消息<mt-badge type="success" size="small" v-show="msgs.has_read_messages.length">{{ msgs.has_read_message.length }}</mt-badge></mt-tab-item>
      </mt-navbar>
      <mt-tab-container class="content" v-model="active">
        <mt-tab-container-item id="unread">
          <ul class="cellWrapper" v-if="msgs.hasnot_read_messages.length">
            <li class="cell" v-for="(msg, index) of msgs.hasnot_read_messages" :key="index">
              <div class="inf">
                <router-link class="user" :to="{name: 'UserInfo', params: {loginname: msg.author.loginname}}" @click.native="hideAll" v-if="msg.author.loginname">
                  <div class="avatar">
                    <img :src="msg.author.avatar_url">
                  </div>
                  <span class="name">{{ msg.author.loginname + ':' }}</span>
                </router-link>
                <div class="date">{{ msg.reply.create_at | dateFormat}}</div>
              </div>
              <div class="content" v-html="msg.reply.content"></div>
              <div class="topic">主题：<router-link :to="{name: 'TopicContent', params: {id: msg.topic.id}}" @click.native="markSingleRead(msg.id)">{{ msg.topic.title }}</router-link></div>
            </li>
          </ul>
          <span class="noData" v-show="!msgs.hasnot_read_messages.length">暂无消息</span>
        </mt-tab-container-item>
        <mt-tab-container-item id="read">
          <ul class="cellWrapper" v-if="msgs.has_read_messages.length">
            <li class="cell" v-for="(msg, index) of msgs.has_read_messages" :key="index">
              <div class="inf">
                <router-link class="user" :to="{name: 'UserInfo', params: {loginname: msg.author.loginname}}" @click.native="hideAll" v-if="msg.author.loginname">
                  <div class="avatar">
                    <img :src="msg.author.avatar_url">
                  </div>
                  <span class="name">{{ msg.author.loginname + ':' }}</span>
                </router-link>
                <div class="date">{{ msg.reply.create_at | dateFormat}}</div>
              </div>
              <div class="content" v-html="msg.reply.content"></div>
              <div class="topic">主题：<router-link :to="{name: 'TopicContent', params: {id: msg.topic.id}}" @click.native="hideAll">{{ msg.topic.title }}</router-link></div>
            </li>
          </ul>
          <span class="noData" v-if="!msgs.has_read_messages.length">暂无消息</span>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MsgCenter',
  data() {
    return {
      active: 'unread',
      msgs: {
        hasnot_read_messages: [],
        has_read_messages: []
      }
    }
  },
  computed: {
    ...mapState([
      'accessToken',
      'msgNum',
      'isShowMsg'
    ])
  },
  created() {
    this.getMsg()
  },
  watch: {
    accessToken(val, oldVal) { // 监听登录状态，更新消息数据
      this.getMsg()
    }
  },
  methods: {
    ...mapMutations([
      'setMsg',
      'handleMsg',
      'handleSlideBar'
    ]),
    // 获取消息
    getMsg() {
        if(!this.accessToken) {
          this.msgs.hasnot_read_messages = [];
          this.msgs.has_read_messages = [];
          return
        }
        this.$axios.get(`https://cnodejs.org/api/v1/messages?accesstoken=${this.accessToken}`)
        .then((response) => {
          this.msgs = response.data.data
        })
        .catch((error) => {
          if(error.response) {
            this.$toast(error.response.data.error.msg)
          }else {
            this.$toast('请求失败，' + error)
          }
        })
    },
    // 单条消息标记已读
    markSingleRead(id) {
      this.$axios.post(`https://cnodejs.org/api/v1/message/mark_one/${id}`, {
        accesstoken: this.accessToken
      })
      .then(response => {
        if(response.data.success) {
          this.getMsg()  // 获取消息
          this.setMsg()  // 更新未读消息数
        }else {
          this.$toast('标记已读失败')
        }
      })
      .catch(error => {
        if(error.response) {
          this.$toast(error.response.data.error_msg)
        }else {
          this.$toast('请求失败，' + error)
        }
      })
      // 隐藏全部
      this.hideAll()
    },
    // 隐藏消息中心界面
    hideMsgCenter() {
      this.handleMsg({isShowMsg: false})
    }
  }
}
</script>
