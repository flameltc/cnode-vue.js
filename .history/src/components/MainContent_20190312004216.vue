<template>
  <div class="mainContent">
    <topic-tab/>
    <router-view/>
  </div>
</template>

<script>
import TopicTab from './TopicTab'
export default {
  name: 'MainContent',
  components: {
    TopicTab
  }
}
</script>

<style lang="scss" scoped>
.mainContent {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>