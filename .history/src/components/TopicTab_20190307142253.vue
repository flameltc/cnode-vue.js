<template>
  <div class="topic-tab">
    <ul>
      <li v-for="(type, key) of types" @click="switchTab(key)" :class="{active: activeTab === key}"><router-link to="/">{{ type }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TopicTab',
  computed: {
    ...mapState([
      'types',
      'activeTab'
    ])
  },
  methods: {
    ...mapMutations([
      'setTab',
      'setTopics'
    ]),
    switchTab(type, page = 1) {
      this.$indicator.open({
        spinnerType: 'double-bounce'
      });
      this.setTab
    }
  }
}
</script>

