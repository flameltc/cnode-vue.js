<template>
  <transition name="pop">
    <div class="newTopic" v-show="isShowNewTopic">
      <mt-header title="新建主题">
        <mt-button icon="back" slot="left" @click="hide"></mt-button>
      </mt-header>
    </div>
  </transition>
</template>