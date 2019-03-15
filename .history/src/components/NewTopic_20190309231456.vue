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
          <input type="text" placeholder="请输入标题" v-model
        </div>
      </div>
    </div>
  </transition>
</template>