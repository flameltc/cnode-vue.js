<template>
  <div class="topic-tab">
    <ul>
      <li v-for="(type, key) of types" @click="switchTab(key)" :class="{active: activeTab === key}"><router-link to="/">{{ type }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations }
export default {
  
}
</script>

