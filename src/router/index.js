import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import EntityNew from 'components/EntityNew'
import EntityDetail from 'components/EntityDetail'

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
    }
  ]
})
