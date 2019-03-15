<template>
  <transition name="pop">
    <div class="newTopic" v-show="isShowNewTopic">
      <mt-header title="新建主题">
        <mt-button icon="back" slot="left" @click="hideNewTopic"></mt-button>
      </mt-header>
      <div class="formBlock">
        <div class="topicType">
          <span @click="handleTopicType(true)">{{ type.label }}</span>
        </div>
        <div class="title">
          <input type="text" placeholder="请输入标题" v-model="title">
        </div>
        <div class="content">
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
      
    }
  }
}
</script>
