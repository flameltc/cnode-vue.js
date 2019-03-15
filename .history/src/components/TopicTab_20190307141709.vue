<template>
  <div class="topic-tab">
    <ul>
      <li v-for="(type, key) of types" @click="switchTab()"></li>
    </ul>
  </div>
</template>
