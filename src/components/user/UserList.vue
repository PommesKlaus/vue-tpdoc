<template>
  <div class="col-sm-9 content">

    <div class="jumbotron">
      <h1>App Settings</h1>
      <h2>User List</h2>
    </div>

    <div class="general-info">

      
      <!-- Eventually show template and allow changes -->

    </div>

  </div>
</template>

<script>
// import axios from 'axios'
// import settings from '../../../settings/config.json'
// import router from '../../../router/'

// const url = settings.apiUrl

const statusInit = {
  status: 0,
  statusText: '',
  message: ''
}

export default {
  name: 'UserList',
  components: {},
  data () {
    return {
      status: statusInit,
      formData: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
