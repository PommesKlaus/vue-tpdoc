import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Login from 'components/login/Login'
import EntityNew from 'components/entity/EntityNew'
import EntityDetail from 'components/entity/EntityDetail'
import TransactionNew from 'components/transaction/TransactionNew'
import TransactionDetail from 'components/transaction/TransactionDetail'
import TemplateList from 'components/templates/TemplateList'
import TemplateNew from 'components/templates/TemplateNew'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
      path: '/transaction/new',
      name: 'TransactionNew',
      component: TransactionNew
    },
    {
      path: '/transaction/:id',
      name: 'TransactionDetail',
      component: TransactionDetail
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

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('tpdocToken') === null && to.name !== 'Login') {
    // redirect to login-page
    next('Login')
  } else {
    next()
  }
})

export default router
