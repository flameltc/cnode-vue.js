<template>
  <div class="topicList" ref="topicList" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" @scroll="showGoTop($event)">
    <ul>
      <transition-group name="fade">
        <li v-for="(topic, index) of topics" :key="index">
          <div class="avatar">
            <img :src="topic.author.avatar_url">
          </div>
          <div class="detail">
            <div class="titleBlock">
              <span class="tag" :class="topic.top ? 'top' : (topic.good ? 'good' :'')">{{ (topic.top ? '置顶' : '') || (topic.good ? '精华' : '') || types[topic.tab] }}</span>
              <router-link class="title" :to="{name: 'topicContent', params: {id: topic.id}}">{{ topic.title }}</router-link>
            </div>
            <div class="infoBlock">
              <span class="count">{{ topic.reply_count + '/' + topic.visit_count }}</span>
              <span class="date">{{ topic.last_reply_at | dateFormat }}</span>
            </div>
          </div>
        </li>
      </transition-group>
    </ul>
    <div class="spinner" v-show="isShowSpinner">
      <mt-spinner type="snake" color="#409eff" :size="40"></mt-spinner>
    </div>
    <div class="goTop" v-if="isGoTop" @click="goTop()">
      <img src="../assets/gotop.png">
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TopicList',
  data() {
    return {
      isShowSpinner: false,
      isGoTop: false
    }
  },
  created() {
    this.getTopics()
  },
  computed: {
    ...mapState([
      'types',
      'activeTab',
      'page',
      'topics'
    ])
  },
  methods: {
    ...mapMutations([
      'handleBack',
      'setTopics',
      'setPage'
    ]),
    // 获取主题
    getTopics() {
      this.$indicator.open({
        spinnerType: 'double-bounce'
      })
      this.handleBack({isBack: false}) //隐藏返回按钮
      this.$axios.get(`https://cnodejs.org/api/v1/topics?tab=${this.activeTab}`)
      .then(response => {
        this.setTopics({topics: response.data.data})
        this.$indicator.close()
      })
      .catch(error => {
        if(error.response) {
          this.$toast(error.response.data.error_msg)
        }else {
          this.$toast('请求失败，' + error)
        }
        this.$indicator.close()
      })
    },
    // 获取更多主题
    getMore() {
      this.isShowSpinner = true // 显示加载spinner
      this.loading = true // 无限滚动不会触发
      this.setPage()
      this.$axios.get(`https://cnodejs.org/api/v1/topics?page=${this.page}&tab=${this.activeTab}`)
      .then(response => {
        this.isShowSpinner = false
        this.loading = false
        this.setTopics({topics: this.topics.concat(response.data.data)})
      })
      .catch(error => {
        this.isShowSpinner = false
        this.loading = false
        if(error.response) {
          this.$toast(error.response.data.err_msg)
        }else {
          this.$toast('请求失败，' + error)
        }
      })
    },
    // 返回顶部
    goTop() {
      if(this.$refs.topicList.scrollTop <= 0) {
        return
      }
      let timer = setInterval(() => {
        if(this.$refs.topicList.scrollTop <= 0) {
          clearInterval(timer)
        }
        this.$refs.topicList.scrollTop -=300
      }, 3)
    }
  }  
}
</script>

<style lang="sass" scoped>
.topicList
</style>

