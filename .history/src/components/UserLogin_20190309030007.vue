<template>
  <transition name="UseL">
    <div class="userLogin" v-show="isShowUserLogin">
      <div class="form">
        <input type="password" placeholder="请输入accessToken" v-model="loginValue">
        
      </div>
    </div>
  </transition>
</template>
