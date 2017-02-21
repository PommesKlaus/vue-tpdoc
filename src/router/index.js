import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import EntityNew from 'components/entity/EntityNew'
import EntityDetail from 'components/entity/EntityDetail'
import TopicNew from 'components/topic/TopicNew'
import TopicDetail from 'components/topic/TopicDetail'
import TemplateList from 'components/templates/TemplateList'
import TemplateNew from 'components/templates/TemplateNew'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/entities/new',
      name: 'EntityNew',
      component: EntityNew
    },
    {
      path: '/entities/:id',
      name: 'EntityDetail',
      component: EntityDetail
    },
    {
      path: '/topics/new',
      name: 'TopicNew',
      component: TopicNew
    },
    {
      path: '/topics/:id',
      name: 'TopicDetail',
      component: TopicDetail
    },
    {
      path: '/templates',
      name: 'TemplateList',
      component: TemplateList
    },
    {
      path: '/templates/new',
      name: 'TemplateNew',
      component: TemplateNew
    }
  ]
})
