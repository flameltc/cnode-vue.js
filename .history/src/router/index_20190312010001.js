import Vue from 'vue'
import Router from 'vue-router'
import MainContent from '@/components/MainContent'
import TopicList from '@/components/TopicList'
import TopicContent from '@/components/TopicList'
import UserInfo from '@/components/UserInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainContent,
      children: [
        {
          path: '',
          name: 'TopicList',
          component: TopicList
        },
        {
          path: 'topicContent/:id',
          name: 'TopicContent',
          component: TopicContent
        }
      ]
    }, {
      path: '/content/:id',
      component: Content
    }
  ]
})
