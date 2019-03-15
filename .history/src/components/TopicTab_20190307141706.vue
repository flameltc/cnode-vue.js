<template>
  <div class="topic-tab">
    <ul>
      <li v-for="(type, key) of types" @click="switch"></li>
    </ul>
  </div>
</template>
