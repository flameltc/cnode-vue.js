<template>
  <header class="header">
    <div class="headerBox">
      <i class="headLogoMenu iconfont iconMenu" v-if="icon" @click="showMenuSlide"></i>
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
      this.$store.commit('showMenuSlide', true);
    },
    showMsg() {
      this.$store.commit('showMsg', true);
    },
  },
  computed: {
    ak() {
      return this.$store.state.ak;
    }
  },
  created() {
    if (!this.ak) {
      return;
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    position relative
    display flex
    flex-direction column
    width 100%
    height 70px
    background-color #dadada
    justify-content center
    align-items center
    box-shadow 0 1px 10px rgba(0, 0, 0, .2)
    i
      position absolute
      z-index 1
      display inline-block
      flex 1
      width 25px
      height 25px
      
</style>

