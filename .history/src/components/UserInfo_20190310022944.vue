<template>
  <div class="userInfo">
    <div class="cell user">
      <div class="avatar">
        <img :src="userInfo.avatar_url">
      </div>
      <div class="inf">
        <span>用户名：{{ userInfo.loginname }}</span>
        <span>github:<a :href="`http://github.com/${userInfo.githubUsername}`" target="_blank">{{ userInfo.githubUser}}</a></span>
      </div>
    </div>
  </div>
</template>
