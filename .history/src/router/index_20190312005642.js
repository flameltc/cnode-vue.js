import Vue from 'vue'
import Router from 'vue-router'
import MainContent from '@/components/MainContent'
import TopicList from '@/components/TopicList'
import TopicContent from '@/components/TopicList'
import UserInfo from '@/components/UserInfo'
import Index from '@/pages/index'
import Content from '@/pages/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexPage',
      component: Index
    }, {
      path: '/content/:id',
      component: Content
    }
  ]
})
