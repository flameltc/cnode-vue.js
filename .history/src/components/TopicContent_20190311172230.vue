<template>
  <div class="topicCon" ref="topicContent" @scroll="showGoTop($event)">
    <div class="contentBlock">
      <h3 class="title">{{ topicContent.title }}</h3>
      <div class="infoWrapper content">
        <div class="info">
          <router-link class="user" :to="{name: 'UserInfo', params: {loginname: topicContent.author && topicConetnt.author.loginname}}" v-if="loginname: topicContent.author && topicConetnt.author.loginname"></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
