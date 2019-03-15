<template>
  <header class="header">
    <div class="headerBox">
      <i class="headLogoMenu iconfont icon-fl1" v-if="icon" @click="showMenuSlide"></i>
      <i class="headLogoBack iconfont iconBack" v-if="!icon" @click="goBack"></i>
      <img src="../../static/image/icon/cnodejs_light.svg" class="logoImg">
      <i @click="showMsg" v-show="ak" class="icon-msg"></i>
      <span v-show="ak" class="msg-count">{{msgCount}}</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'header',
  methods: {
    showMuneSlide() {
      this.$store.commit('')
    }
  }
}
</script>
