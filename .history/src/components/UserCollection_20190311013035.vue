<template>
  <transition name="pop">
    <div class="userCol" v-show="isShowUserCollection">
      <mt-header class="mHeader" title="我的收藏">
        <mt-button icon="back" slot="left" @click="hideUserCollection"></mt-button>
      </mt-header>
      <div class="content">
        <ul class="cellWrapper">
          <li class="cell" v-for="(collection, index) of collections" :key="index">
            <div class="title">
              <span class="tag">{{ types[collection.tab] }}</span>
              <router-link class="link" :to="{name: 'TopicContent', params: {id: collection.id}}" @click.native="hideAll">{{ collection.title }}</router-link>
            </div>
            <div class="inf">
              <span>{{ collection.create_at | dateFormat }}</span>
              <span>{{ collection.reply_count + '/' + collection.visit_count }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'UserCollection',
  data() {
    return {
      collections: []
    }
  },
  computed: {
    ...mapState([
      'accessToken',
      'userInfo',
      'types',
      'isShowUserCollection',
      'isShowSlideBar'
    ])
  },
  created() {
    this.getUserCollection()
  },
  watch: {
    accessToken(val, oldVal) { // 监听登录状态，更新用户收藏数据
      this.getUserCollection()
    }
  },
  methods: {
    ...mapMutations([
      'handleCollection',
      'handleSlideBar'
    ]),
    // 获取用户收藏
    getUserCollection() {
      if(!this.accessToken) { // 判断当前登录状态
        this.collections = []
        return
      }
      this.$axios.get(`https://cnodejs.org/api/v1/topic_collect/${this.userInfo.loginname}`)
      .then((response) => {
        this.collections = response.data.data
      })
      .catch((error) => {
        if(error.response) {
          this.$toast(error.response.data.error_msg)
        }else {
          this.$toast('请求失败，' + error)
        }
      })
    },
    
  }
}
</script>

