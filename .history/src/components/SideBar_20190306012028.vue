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
            <mt-cell title="新建话题" is-link></mt-cell>
          </div>
          <div @click="showUserCollection">
            <mt-cell ></mt-cell>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
