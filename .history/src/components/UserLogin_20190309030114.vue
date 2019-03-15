<template>
  <transition name="UseL">
    <div class="userLogin" v-show="isShowUserLogin">
      <div class="form">
        <input type="password" placeholder="请输入accessToken" v-model="loginValue">
        <mt-button type="primary" size="large" @click=""></mt-button>
      </div>
    </div>
  </transition>
</template>
