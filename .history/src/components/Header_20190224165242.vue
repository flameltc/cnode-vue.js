<template>
  <header class="header">
    <div class="headerBox">
      <i class="headLogoMenu iconfont icon-fl1" v-if="icon" @click="showMenuSlide"></i>
      <i class="headLogoBack iconfont iconBack" v-if="!icon" @click="goBack"></i>
      <h1></h1>
      <h1></h1>
    </div>
  </header>
</template>
