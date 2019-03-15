<template>
  <transition name="pop">
    <div class="userCol" v-show="isShowUserCollection">
      <mt-header class="mHeader" title="我的收藏">
        <mt-button icon="back" slot="left" @click="hideUserCollection"></mt-button>
      </mt-header>
      <div class="content"></div>
    </div>
  </transition>
</template>
