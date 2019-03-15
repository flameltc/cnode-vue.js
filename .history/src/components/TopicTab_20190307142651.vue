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
      this.setTab({activeTab: type, page: 1, topic: []});
      this.$axios.get(`https://cnodejs.org/api/v1/topics?page=${page}&tab=${this.activeTab}`)
      .then(res => {
        this.$indicator.close()
        this.setTopics({topics: res.data.data})
      })
      .catch(error => {
        this.$indicator.close()
        if(error.response) {
          this.$toast(error.response.data.error_msg)
        }else {
          
        }
      })
    }
  }
}
</script>

