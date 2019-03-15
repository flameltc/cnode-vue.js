<template>
  <transition name="pop">
    <div class="newTopic" v-show="isShowNewTopic">
      <mt-header title="新建话题"></mt-header>
    </div>
  </transition>
</template>