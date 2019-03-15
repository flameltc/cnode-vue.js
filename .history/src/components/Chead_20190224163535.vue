<template>
  <div class="head">
    <div class="headBox" :class="{ 'isfixed': fixed }">
      <header class="headLogo clearfix">
        <i class="headLogoMenu iconfont icon-fl1" v-if="icon" @click="showMenuSlide"></i>
        <i class="headLogoBack iconfont iconBack" v-if="!icon" @click="goBack"></i>
        <img src="../../static/image/icon/cnodejs_light.svg" class="logoImg">
        <i class="icon-msg" @click="showMsg" v-show="ak"></i>
        <span v-show="ak" class="msg-count">{{ msgCount }}</span>
      </header>
    </div>
    <menu-slide :show="leftNavStatus" @hideMenuSlide="hideMuneSlide"></menu-slide>
  </div>
</template>

<script>
export default {
  name: 'cheader',
  data() {
    return {
      msgCount: 0,
    }
  }
}
</script>
