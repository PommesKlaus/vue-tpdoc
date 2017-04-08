<template>
  <div>

    <header>
      <header-nav></header-nav>
    </header>

    <main>
      <div class="container">

        <div class="col-sm-3">
          <p class="text-center"><i class="fa fa-user-circle-o fa-5" aria-hidden="true"></i></p>
          <p class="text-center"><button class="btn btn-danger" @click="logout">Logout</button></p>
        </div>

        <div class="col-sm-9 content">

          <div class="jumbotron">
            <h1>User Settings</h1>
            <h2>Change Password etc.</h2>
          </div>

          <div v-if="error!==''" class="alert alert-danger" role="alert">
            {{ error }}
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
                <div class="center">
                  <button class="btn btn-success" type="submit"><i class="fa fa-save"></i> Save Topic</button>
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

const url = settings.apiUrl
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tpdocToken')

export default {
  name: 'UserDetails',
  components: {
    'header-nav': HeaderNav
  },
  data () {
    return {
      error: '',
      formData: {}
    }
  },
  methods: {
    updateUser: function (evt) {
      let payload = Object.assign({}, this.formData)
      delete payload._id
      axios.put(url + 'users/' + this.$route.params.id, payload)
      .then(function (response) {
        console.log('User update successful')
      })
      .catch(err => {
        this.error = err.response.data.message
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
.multiselect-div {
  height: 250px;
}

.clear-list {
  padding-left: 0px;
}

.clear-list-item {
  list-style-type: none;
}

.country-filter-input {
  width: 60px;
}

.fa-5 {
  font-size: 12em;
  margin-top: 30px;
}
</style>
