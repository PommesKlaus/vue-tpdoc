<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">TP-Documenter</a>
      </div>          
      <div>
        <ul class="nav navbar-nav">
          <li>
            <router-link :to="{ name: 'TransactionNew' }"><i class="fa fa-pencil" aria-hidden="true"></i>Add Transaction</router-link>
          </li>
          <li v-if="userRoles.indexOf('tp') !== -1">
            <a href="#"><i class="fa fa-cube" aria-hidden="true"></i>Entity</a>
          </li>
          <li v-if="userRoles.indexOf('tp') !== -1">
            <a href="#"><i class="fa fa-book" aria-hidden="true"></i>Generate Report</a>
          </li>
          <li v-if="userRoles.indexOf('admin') !== -1">
            <a href="#"><i class="fa fa-cogs" aria-hidden="true"></i>Settings</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="#" class="navbar-link"><i class="fa fa-user-circle-o" aria-hidden="true"></i>{{ userEMail }}</a>
          </li>
          <!--<li>
            <a href="#" class="navbar-link">
              <i class="fa fa-sign-out" aria-hidden="true"></i>Logout
            </a>
          </li>-->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export default {
  name: 'HeaderNav',
  data () {
    return {
      userEMail: '',
      userRoles: []
    }
  },
  methods: {},
  created () {
    const token = localStorage.getItem('tpdocToken')
    if (token !== null) {
      const decodedToken = jwtDecode(localStorage.getItem('tpdocToken'))
      this.userEMail = decodedToken.eMail
      this.userRoles = decodedToken.roles
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
  }
}
</script>


<style scoped>

/*
  Header-Navigation
*/

.navbar .navbar-nav>li>a.router-link-active {
  border-bottom: 2px solid #FF9800;
}

@media (max-width: 991px) {
  header .fa {
    display: none;
  }
}

@media (max-width: 768px) {
  .navbar-fixed-top {
    position: relative;
  }  
}

.navbar .fa {
  margin-right: 7px;
  margin-left: 2px;
}

</style>
