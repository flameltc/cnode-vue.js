<template>
  <header class="header">
    <div class="headerBox">
      <i @click.stop.prevent="showMenuSlide" class="iconMenu"></i>
      <i class="headLogoBack iconfont iconBack" v-if="!icon" @click="goBack"></i>
      <h1></h1>
    </div>
  </header>
</template>
