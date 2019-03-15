<template>
  <transition name="pop">
    <div class="newTopic" v-show="isShowNewTopic">
      <mt-header title="新建主题">
        <mt-button icon="back" slot="left" @click="hideNewTopic"></mt-button>
      </mt-header>
      <div class="formBlock">
        <div class="formPart topicType">
          <span @click="handleTopicType(true)">{{ type.label }}</span>
        </div>
        <div class="formPart title">
          <input type="text" placeholder="请输入标题" v-model="title">
        </div>
        <div class="formPart content">
          <textarea rows="10" placeholder="请输入内容" v-model="content"></textarea>
        </div>
      </div>
      <div class="btn">
        <mt-button type="primary" size="large" @click="postTopic">发布</mt-button>
      </div>
      <transition name="pop">
        <div class="TopicTypeWrapper" v-if="isShowType">
          <div class="mask"></div>
          <div class="typePicker">
            <div class="btnBar">
              <span class="cancel" @click="handleTopicType(false)">取消</span>
              <span class="ensure" @click="ensureType">确定</span>
            </div>
            <mt-picker :slot="types" :valueKey="'label'" :visibleItemCount="3" :itemHeight="40" @change="changeType"></mt-picker>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'NewTopic',
  data() {
    return {
      type: {
        label: '分享',
        value: 'share'
      },
      storageType: {},
      title: '',
      content: '',
      types: [
        {
          values: [
            {
              label: '分享',
              value: 'share'
            },
            {
              label: '回答',
              value: 'ask'
            },
            {
              label: '招聘',
              value: 'job'
            },
            {
              label: '测试',
              value: 'dev'
            }
          ]
        }
      ],
      isShowType: false
    }
  },
  computed: {
    ...mapState([
      'accessToken',
      'isShowNewTopic'
    ])
  },
  methods: {
    ...mapMutations([
      'handleNewTopic',
      'handleSlideBar'
    ]),
    // 切换类别
    changeType() {
      this.storageType = values[0]
    },
    // 确认类别
    ensureType() {
      this.type = this.storageType
      this.isShowType = false
    },
    // 发布主题
    postTopic() {
      this.$indicator.open({
        spinnerType: 'double-bounce'
      })
      this.$axios.post('http://cnodejs.org/api/v1/topics', {
        accessToken: this.accessToken,
        title: this.title,
        tab: this.type.value,
        content: this.content
      })
      .then(response => {
        this.$indicator.close()
        if(response.data && response.data.success) {
          this.handleNewTopic({isShowNewTopic: false})
          this.handleSlideBar({isShowSlideBar: false})
          this.$router.push({name: 'TopicContent', params: {id: response.data.topic_id}})
        }else {
          this.$toast('发布失败')
        }
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
    // 显示/隐藏topic类别选择器
    handleTopicType(st) {
      this.isShowType = st
    },
    // 隐藏新建主题界面
    hideNewTopic() {
      this.handleNewTopic({isShowNewTopic: false})
    }
  }
}
</script>

<style lang="scss" scoped>
  .newTopic {
    @include absolute-panel;
    background: $primary-bg;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 14px;
    z-index: 1;
    .formBlock {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 30px;
      .formPart {
        &.topicType {
          margin-bottom: 15px;
          span {
            display: block;
            line-height: 30px;
            height: 30px;
            padding: 0 10px;
            border-bottom: 1px solid $border-color;
          }
        }
        &.title {
          margin-bottom: 15px;
        }
        &.content {
          flex: 1;
        }
        text-align: left;
        input[type="text"] {
          width: 100%;
          height: 30px;
          padding: 0 10px;
          border-bottom: 1px solid $border-color;
          border-radius: 0;
        }
        textarea {
          width: 100%;
          padding: 10px;
          height: 100%;
          border: 1px solid $border-color;
          border-radius: 5px;
        }
      }
    }
    .btn {
      padding: 30px;
    }
    .topicTypePicker {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      .mask {
        flex: 1;
      }
      .typePicker {
        background: $primary-bg;
        padding: 10px 30px;
        box-shadow: 0 0 12px #80
      }
    }
  }
</style>
