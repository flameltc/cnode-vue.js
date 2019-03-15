<template>
  <transition name="pop">
    <div class="msgCenter" v-show="isShowMsgCenter">
      <mt-header class="mHeader" title="消息中心">
        <mt-button icon="back" slot="left" @click="hideMsgCenter"></mt-button>
      </mt-header>
      <mt-navbar class="tab" v-model="active">
        <mt-tab-item id="hasread">已读消息 <mt-badge type="success" size="small" v-show="msgs.has_read_messages.length">{{ msgs.has_read_message.length }}</mt-badge></mt-tab-item>
      </mt-navbar>
      <mt-tab-container class="content" v-model="active">

      </mt-tab-container>
    </div>
  </transition>
</template>
