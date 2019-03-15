<template>
  <mt-header class="mHeader" title="CNode">
    <mt-button icon="back" slot="left" v-show="isBack" @click="$router.go(-1)">返回</mt-button>
    <mt-button icon="more" slot="right" @click="showSlideBar"></mt-button>
  </mt-header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: ''
}
</script>

<style lang="scss" scoped>
  .header
    position relative
    display flex
    flex-direction column
    width 100%
    height 70px
    background-color #dadada
    color white
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
    h1
      flex 5
      letter-spacing 2px
      transitiom .3s ease-in-out
      :hover
        transform rotate(8deg)
        transition .3s ease-in-out
</style>
