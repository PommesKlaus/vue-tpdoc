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
              <li class="header">User</li>
              <li>
                <ul class="nav">
                  <li><a href="#">Create new</a></li>
                  <li><a href="#">List existing</a></li>
                </ul>
              </li>
              <li class="header">Templates</li>
              <li>
                <ul class="nav">
                  <li><a href="#">Create New</a></li>
                  <li><a href="#">List existing</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-sm-9 content">

          <div class="jumbotron">
            <h1>App Settings</h1>
            <h2>Restricted Access</h2>
          </div>

          <div class="general-info">

            <form @submit.prevent="updateUser" class="form-horizontal">

              <div class="form-group">
                <span class="col-sm-3"><strong>E-Mail/Username</strong></span>
                <span class="col-sm-9"><pre>{{ formData.eMail }}</pre></span>
              </div>

              <div class="form-group">
                <label class="col-sm-3" for="inputFirstName">First Name</label>
                <!--<span class="col-sm-3"><strong>First Name:</strong></span>-->
                <div class="col-sm-9">                  
                  <input type="text" class="form-control" id="inputFirstName" placeholder="" v-model="formData.firstName">
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-3" for="inputFirstName">Last Name</label>
                <!--<span class="col-sm-3"><strong>First Name:</strong></span>-->
                <div class="col-sm-9">                  
                  <input type="text" class="form-control" id="inputLastName" placeholder="" v-model="formData.lastName">
                </div>
              </div>



              <div class="form-group">
                <span class="col-sm-3"><strong>Roles</strong></span>
                <div class="col-sm-9"><span class="label label-success" v-for="(role,index) in formData.roles">{{ role }}</span></div>
              </div>

              <div class="row">
                <div class="text-center">
                  <button class="btn btn-success" type="submit"><i class="fa fa-save"></i> Save Changes</button>
                </div>
              </div>

            </form>

            <!-- Eventually show template and allow changes -->

          </div>

        </div>

      </div>
    </main>

  </div>
</template>

<script>
import axios from 'axios'
import settings from '../../settings/config.json'
import router from '../../router/'
import HeaderNav from '../header/HeaderNav'
import Status from '../general/Status'

const url = settings.apiUrl

const statusInit = {
  status: 0,
  statusText: '',
  message: ''
}

export default {
  name: 'UserDetails',
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
  methods: {
    updateUser: function (evt) {
      this.status = statusInit
      let payload = Object.assign({}, this.formData)
      delete payload._id
      axios.put(url + 'users/' + this.$route.params.id, payload)
      .then(response => {
        this.status = 200
      })
      .catch(err => {
        this.status = {
          status: err.response.status,
          statusText: err.response.statusText,
          message: err.response.data.message
        }
      })
    },
    logout () {
      localStorage.removeItem('tpdocEMail')
      localStorage.removeItem('tpdocToken')
      router.push({name: 'Login'})
    }
  },
  created () {
    axios.all([
      axios.get(url + 'users/' + this.$route.params.id)
    ]).then(([{ data: userData }]) => {
      this.formData = userData
    })
  }
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

#sidebar-wrapper a.active {
  background-color: #E3F2FD;
  font-weight: 700;
  text-align: right;
}

#sidebar-wrapper a.active>span.badge {
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
