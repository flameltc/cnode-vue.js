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
              <span class="tag" :class="topic.top ? 'top' : (topic.good ? 'good' :'')">{{ (topic.top ? '置顶' : '') || (topic.good ? '精华' : '') || type}}</span>
            </div>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>