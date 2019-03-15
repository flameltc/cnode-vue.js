<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import NewTopic from '@/components/NewTopic'
import UserLogin from '@/components/UserLogin'
import UserCollection from '@/components/UserCollection'
import MsgCenter from '@/components/MsgCenter'
import SlideBar from '@/components/SlideBar'
export default {
  name: 'App',
  components: {
    Header,
    NewTopic,
    UserLogin,
    UserCollection,
    MsgCenter,
    SlideBar
  }
}
</script>

<style lang="scss">
  @import '../static/iconfont/iconfont.css';
@import './assets/css/base';
@import './assets/css/common';
</style>
