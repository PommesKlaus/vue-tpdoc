import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import newEntity from 'components/newEntity'

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
      name: 'newEntity',
      component: newEntity
    }
  ]
})
