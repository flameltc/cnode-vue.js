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
          <i class="iconfont incon-comment" @click="focusComment"></i>
          <i class="iconfont" :class="{'icon-collection-active': topicContent.is_collect, 'icon-collection': !topicContent.is_collection}" @click="handleCollection"></i>
        </div>
      </div>
      <div v-html="topicContent.content"></div>
    </div>
    <div class="replyBlock">
      <span class="count">{{ topicContent.reply_count }}条回复</span>
      <ul>
        <li v-for="(reply, index) of topicContent.replies" class="replyCell" :key="index">
          <div class="infoWrapper reply">
            <div class="info">
              <router-link class="user" :to="{name: 'UserInfo', params: {loginname: reply.author.loginname}}" v-if="reply.author.loginname">
                <div class="avatar">
                  <img :src="reply.author.avatar_url">
                </div>
                <span>{{ reply.author.loginname }}</span>
              </router-link>
              <span>{{ reply.create_at | dateFormat }}</span>
              <span>{{ index + 1 }}楼</span>
            </div>
            <div class="operation">
              <i class="iconfont icon-reply" @click="handleReply(index)"></i>
              <i class="iconfont" :class=""></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
