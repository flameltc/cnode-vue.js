<template>
  <transition name="bar">
    <div class="slideBar" v-show="isShowSlideBar">
      <div class="container">
        <div class="menu">
          <div @click="showUserLogin">
            <mt-cell class="user" :title="userInfo.loginname || '登录'" is-link>
              <img slot="icon" :src="userInfo.avatar_url || ''" width="22" height="22" v-show="accessToken">
            </mt-cell>
          </div>
          <div @click="showNewTopic">
            <mt-cell title="新建主题" is-link></mt-cell>
          </div>
          <div @click="showUserCollection">
            <mt-cell title="收藏主题" is-link></mt-cell>
          </div>
          <div @click="showMsg">
            <mt-cell title="我的消息" is-link>
              <mt-badge size="small" color="red" v-show="msgNum">{{ msgNum }}</mt-badge>
            </mt-cell>
          </div>
          <div class="exit" @click="logout" v-if="accessToken">
            <mt-cell title="退出登录"></mt-cell>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
