<template>
  <div class="col-sm-9 content">

    <div class="jumbotron">
        <h1>App Settings</h1>
        <h2>List of available Templates</h2>
    </div>

    <div class="general-info">

      <div>
        <router-link :to="{ name: 'TemplateNew', params: {}}">Create new</router-link>
      </div>

      <div v-if="templates.length === 0">
        <p>No templates available</p>
      </div>

      <div v-else>
        <table class="table table-sm">
          <thead>
            <tr>
              <th>For</th>
              <th>Type</th>
              <th>Created at</th>
              <th>Upddated at</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(template, index) in templates">
              <td>{{ template.for }}</td>
              <td>{{ template.type }}</td>
              <td>{{ template.createdAt }}</td>
              <td>{{ template.updatedAt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import settings from '../../settings/config.json'

const url = settings.apiUrl

export default {
  name: 'listTemplates',
  data () {
    return {
      templates: []
    }
  },
  created () {
    axios.all([
      axios.get(url + 'templates')
    ]).then(([{ data: templateData }]) => {
      this.templates = templateData
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
