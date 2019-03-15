<template>
  <transition name="pop">
    <div class="msgCenter" v-show="isShowMsgCenter">
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
                <router-link class></router-link>
              </div>
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </transition>
</template>
