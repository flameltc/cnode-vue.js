<template>
  <div class="head">
    <div class="handBox" :class="{ 'isfixed': fixed }">
      <header class="headLogo clearfix">
        <i class="headLogoMenu iconfont icon-fl1" v-if="icon" @click="showMenuSlide"></i>
        <i class="headLogoBack iconfont iconBack" v-if="!icon" @click="goBack"></i>
        <img src="../../static/image/icon/cnodejs_light.svg" class="logoImg">
      </header>
    </div>
    <menu-slide :show="leftNavStatus" @hideMenuSlide="hideMuneSlide"></menu-slide>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MenuSlide from './Menu.vue'
export default {
  props: {
    fixed: Boolean,
    icon: Boolean
  },
  computed: mapState({
    leftNavStatus: status => state.com.leftNavStatus
  }),
  methods: {
    ...mapActions({ setNavState: 'setNavStatus' }),

    // 显示MenuSlider
    showMenuSlide() {
      
    }
  }
}
</script>
