<template>
  <div class="topicList" ref="topicList" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" @scroll="showGoTop($event)">
    <ul>
      <transition-group name="fade">
        <li v-for="(topic, index) of topics" :key="index">
          <div class="avatar">
            <img :src="topic.author.avatar_url">
          </div>
          <div class="detail">
            <div class="titleBlock">
              <span class="tag" :class="topic.top ? 'top' : (topic.good ? 'good' :'')">{{ (topic.top ? '置顶' : '') || (topic.good ? '精华' : '') || types[topic.tab] }}</span>
              <router-link class="title" :to="{name: 'topicContent', params: {id: topic.id}}">{{ topic.title }}</router-link>
            </div>
            <div class="infoBlock">
              <span class="count">{{ topic.reply_count + '/' + topic.visit_count }}</span>
              <span class="date"></span>
            </div>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>