<template>
  <div>
    <h1>Create new Entity</h1>

    <div class="general-info">
      <h2 class="group">Master Data</h2>

      <div class="row">
        <div class="form-group col-md-2">
          <label for="inputCode">Company Code</label>
          <input type="text" class="form-control" id="inputCode" placeholder="" v-model="formData.shortname">
        </div>
        <div class="form-group col-md-10">
          <label for="inputName">Name</label>
          <input type="text" class="form-control" id="inputName" placeholder="" v-model="formData.name">
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-6">
          <label for="inputCountry">Country</label>
          <select class="form-control" id="inputCountry" v-model="formData.country">
            <option v-for="country in countries" v-bind:value="country.code">
              {{ country.name }}
            </option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="selectType">Company Type</label>
          <select class="form-control" id="selectType" v-model="formData.type">
            <option v-for="option in templates" v-bind:value="option.type">
              {{ option.type }}
            </option>
          </select>
        </div>
      </div>


      
    </div>


  </div>
</template>

<script>
import axios from 'axios'
import countries from '../settings/countries.json'

export default {
  name: 'newEntity',
  data () {
    return {
      countries: countries,
      templates: [],
      formData: {
        shortname: '',
        name: '',
        country: '',
        type: '',
        questionnaire: {}
      }
    }
  },
  watch: {
    'formData.type': function () {
      this.formData.questionnaire = this.templates.find((template) => {
        return template.type === this.formData.type
      }).questionnaire
    }
  },
  beforeMount () {
    axios.all([
      axios.get('http://localhost:3000/api/Templates?for=entity')
    ]).then(([{ data: templateData }]) => {
      this.templates = templateData
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.group {
  border-bottom: 1px solid #eee;
  color: #616161
}
</style>
