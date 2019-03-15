<template>
  <transition name="pop">
    <div class="msgCenter" v-show="isShowMsgCenter">
      <mt-header class="mHeader" title="消息中心">
        <mt-button icon="back" slot="left" @click="hideMsgCenter"></mt-button>
      </mt-header>
      <mt-navbar class="tab" v-model="active"></mt-navbar>
    </div>
  </transition>
</template>
