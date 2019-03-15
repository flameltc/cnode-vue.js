<template>
  <div class="topic-tab">
    <ul>
      <li v-for="(type, key) of types" @click="switchTab(key)" :class="{active: active}"></li>
    </ul>
  </div>
</template>
