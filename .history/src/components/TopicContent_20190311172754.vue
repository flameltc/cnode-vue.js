<template>
  <div class="topicCon" ref="topicContent" @scroll="showGoTop($event)">
    <div class="contentBlock">
      <h3 class="title">{{ topicContent.title }}</h3>
      <div class="infoWrapper content">
        <div class="info">
          <router-link class="user" :to="{name: 'UserInfo', params: {loginname: topicContent.author && topicConetnt.author.loginname}}" v-if="topicContent.author && topicConetnt.author.loginname">
            <div class="avatar">
              <img :src="topicContent.author && topicContent.author.avatar_url">
            </div>
            <span>{{ topicContent.author && topicContent.author.loginname }}</span>
          </router-link>
          <span>{{ topicContent.create_at | dateFormat }}</span>
          <span>{{ types[topicContent.tab] }}</span>
          <span>{{ topicContent.reply_count + '/' + topicContent.visit_count }}</span>
        </div>
        <div class="operation">
          <i class="icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>
