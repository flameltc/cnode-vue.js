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
import MsgCenter from '@/components/'
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "./style/style"
</style>
