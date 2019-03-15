<template>
  <mt-header class="mHeader" title="CNode">
    <mt-button icon="back" slot="left" v-show="isBack" @click="$router.go(-1)">返回</mt-button>
    <mt-button icon="more" slot="right" @click="showSlideBar"></mt-button>
  </mt-header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState([
      'isBack'
    ])
  },
  methods: {
    ...mapMutations([
      'handleSlideBar'
    ]),
    showSlideBar() {
      this.handleSildeBar({isShowSlideBar: true})
    }
  }
}
</script>

<style lang="scss" scoped></style>
