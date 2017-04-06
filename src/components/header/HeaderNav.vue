<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">TP-Documenter</a>
      </div>          
      <div>
        <ul class="nav navbar-nav">
          <li>
            <a href="#"><i class="fa fa-pencil" aria-hidden="true"></i>Add Transaction</a>
          </li>
          <li class="active">
            <a href="#"><i class="fa fa-cube" aria-hidden="true"></i>Entity</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-book" aria-hidden="true"></i>Generate Report</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-copy" aria-hidden="true"></i>Templates</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="#" class="navbar-link" v-on:click="getAuth"><i class="fa fa-user-circle-o" aria-hidden="true"></i>Mark Otto</a>
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

export default {
  name: 'HeaderNav',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    getAuth () {
      const jwt = localStorage.getItem('id_token')
      if (jwt) {
        this.user = jwtDecode(jwt)
      } else {
        this.user = false
      }
    }
  }
}
</script>


<style scoped>

/*
  Header-Navigation
*/

.navbar .navbar-nav>.active>a {
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
