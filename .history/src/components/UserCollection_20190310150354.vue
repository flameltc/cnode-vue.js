<template>
  <transition name="pop">
    <div class="userCol" v-show="isShowUserCollection">
      <mt-header class="mHeader" title="我的收藏">
        <mt-button icon="back" slot="left" @click="hideUserCollection"></mt-button>
      </mt-header>
      <div class="content">
        <ul class="cellWrapper">
          <li class="cell" v-for="(collection, index) from collections" :key="index">
            
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
