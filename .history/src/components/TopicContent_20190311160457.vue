<template>
  <div class="topicCon" ref="topicContent" @scroll="showGoTop($event)">
    <div class="contentBlock">
      <h3 class="title">{{ topicContent.title }}</h3>
    </div>
  </div>
</template>
