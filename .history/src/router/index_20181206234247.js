import Vue from 'vue'
import Router from 'vue-router'
import Index from ''

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexPage',
      component: Index
    }
  ]
})