<template>
  <div>
    <header>
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">TP-Documenter</a>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <div class="container">
        <form class="form-signin"  v-on:submit.prevent="signIn">
          <h2 class="form-signin-heading">Please sign in</h2>

          <div v-if="error!==''" class="alert alert-danger" role="alert">
            {{ error }}
          </div>

          <label for="inputEmail" class="sr-only">Email address</label>
          <input v-model="formData.eMail" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
          <label for="inputPassword" class="sr-only">Password</label>
          <input v-model="formData.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import settings from '../../settings/config.json'
// import router from '../../router/'
import jwtDecode from 'jwt-decode'

const url = settings.apiUrl

export default {
  name: 'Login',
  data () {
    return {
      user: {},
      formData: {
        eMail: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    getAuth: function () {
      const jwt = localStorage.getItem('tpdocToken')
      if (jwt) {
        this.user = jwtDecode(jwt)
      } else {
        this.user = false
      }
    },
    signIn: function (evt) {
      axios.post(url + 'auth/login', this.formData)
      .then(function (res) {
        localStorage.setItem('tpdocToken', res.data.token)
        localStorage.setItem('tpdocEMail', res.data.eMail)
        window.location = '/'
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.error = err.response.statusText + ': Incorrect Username and/or Password!'
        } else {
          this.error = err.toString()
        }
      })
    }
  }
}
</script>


<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}

.form-signin button{
  margin-top: 25px;
}
</style>
