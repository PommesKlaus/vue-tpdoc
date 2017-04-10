import Vue from 'vue'
import Router from 'vue-router'
import jwtDecode from 'jwt-decode'
import Hello from 'components/Hello'
import Login from 'components/login/Login'
import EntityNew from 'components/entity/EntityNew'
import EntityDetail from 'components/entity/EntityDetail'
import TransactionNew from 'components/transaction/TransactionNew'
import TransactionDetail from 'components/transaction/TransactionDetail'
import UserDetail from 'components/user/UserDetail'
import Settings from 'components/settings/Settings'
import SettingsGeneral from 'components/settings/general/General'
import UserList from 'components/user/UserList'
import UserNew from 'components/user/UserNew'
import TemplateList from 'components/template/TemplateList'
import TemplateNew from 'components/template/TemplateNew'

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
      path: '/users/:id',
      name: 'UserDetail',
      component: UserDetail
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      children: [
        {
          path: 'general',
          name: 'SettingsGeneral',
          component: SettingsGeneral
        },
        {
          path: 'users/list',
          name: 'UserList',
          component: UserList
        },
        {
          path: 'users/new',
          name: 'UserNew',
          component: UserNew
        },
        {
          path: 'templates/list',
          name: 'TemplateList',
          component: TemplateList
        },
        {
          path: 'templates/new',
          name: 'TemplateNew',
          component: TemplateNew
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('tpdocToken')
  if (token === null) {
    // No jwt found => redirect to login-page
    if (to.name === 'Login') {
      next()
    } else {
      next('/login')
    }
  } else {
    const decodedToken = jwtDecode(token)
    const curTimestamp = Date.now()
    if (curTimestamp > decodedToken.exp * 1000) {
      // jwt exists but is expired => Delete Token from localStorage and redirect to login-page
      localStorage.removeItem('tpdocToken')
      localStorage.removeItem('tpdocEMail')
      next('Login')
    } else {
      next()
    }
  }
})

export default router
