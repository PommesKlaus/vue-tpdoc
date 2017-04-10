<template>
  <div>

    <header>
      <header-nav></header-nav>
    </header>

    <main>
      <div class="container">

        <div class="col-sm-3">
          <p class="text-center"><i class="fa fa-cogs fa-5" aria-hidden="true"></i></p>
          <status :status="status" class="status"></status>
          <div id="sidebar-wrapper">
            <ul class="nav">
              <li class="header"><router-link :to="{ name: 'SettingsGeneral' }">General</router-link></li>
              <li class="header">User</li>
              <li>
                <ul class="nav">
                  <li><router-link :to="{ name: 'UserNew' }">Create new User</router-link></li>
                  <li><router-link :to="{ name: 'UserList' }">List Users</router-link></li>
                </ul>
              </li>
              <li class="header">Templates</li>
              <li>
                <ul class="nav">
                  <li><router-link :to="{ name: 'TemplateNew' }">Create new Template</router-link></li>
                  <li><router-link :to="{ name: 'TemplateList' }">List Templates</router-link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <router-view></router-view>

      </div>
    </main>

  </div>
</template>

<script>
// import axios from 'axios'
// import settings from '../../settings/config.json'
// import router from '../../router/'
import HeaderNav from '../header/HeaderNav'
import Status from '../general/Status'

// const url = settings.apiUrl

const statusInit = {
  status: 0,
  statusText: '',
  message: ''
}

export default {
  name: 'Settings',
  components: {
    'header-nav': HeaderNav,
    'status': Status
  },
  data () {
    return {
      status: statusInit,
      formData: {}
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sidebar-wrapper {
  position: fixed;
  top: 300px;
  overflow-y: auto;
  height: calc(100% - 75px);
  width: 25%;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    width: 150px;
  }
}

@media (min-width: 992px) {
  #sidebar-wrapper {
    width: 205px;
  }
}

@media (min-width: 1200px) {
  #sidebar-wrapper {
    width: 255px;
  }
}

@media (max-width: 768px) {
  #sidebar-wrapper {
    position: relative;
    height: auto;
  }
}

#sidebar-wrapper li.header {
  font-weight: 700;
  margin-top: 25px;
  line-height: 20px;
}

#sidebar-wrapper a.router-link-active {
  background-color: #E3F2FD;
  font-weight: 700;
  text-align: right;
}

#sidebar-wrapper a.router-link-active>span.badge {
  display: none;
}

.fa-5 {
  font-size: 10em;
  margin-top: 30px;
}

.status {
  margin-top: 40px;
}
</style>
