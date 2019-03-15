<template>
  <transition name="bar">
    <div class="slideBar" v-show="isShowSlideBar">
      <div class="container">
        <div class="menu">
          <div @click="showUserLogin">
            <mt-cell class="user" :title="userInfo.loginname" || "登陆" is-link>
              
            </mt-cell>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
