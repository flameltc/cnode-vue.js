<template>
  <div class="userInfo">
    <div class="cell user">
      <div class="avatar">
        <img :src="userInfo.avatar_url">
      </div>
      <div class="inf">
        <span>用户名：{{ userInfo.loginname }}</span>
        <span>GitHub</span>
      </div>
    </div>
  </div>
</template>
