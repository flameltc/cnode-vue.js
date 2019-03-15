<template>
  <div class="topicList" ref="topicList" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" @scroll="showGoTop($event)">
    <ul>
      <transition-group name="fade">
        <li v-for="(topic, index) of topic"></li>
      </transition-group>
    </ul>
  </div>
</template>