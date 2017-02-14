<template>
  <div>
    <h1>Create new Entity</h1>

    <div class="general-info">
      <h2 class="group">Master Data</h2>

      <form @submit.prevent="saveEntity">

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

        <div class="row">
          <div class="center">
            <button class="btn btn-success" type="submit"><i class="fa fa-save"></i> Save Entity</button>
          </div>
        </div>

      </form>

      <!-- Eventually show template and allow changes -->

    </div>

  </div>
</template>

<script>
import axios from 'axios'
import countries from '../../settings/countries.json'
import settings from '../../settings/config.json'
import router from '../../router/'

const url = settings.apiUrl

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
  methods: {
    saveEntity: function (evt) {
      axios.post(url + 'Entities', this.formData)
      .then(function (response) {
        let entityId = response.data._id
        router.push({ name: 'EntityDetail', params: { id: entityId } })
      })
      .catch(function (error) {
        console.log(error)
        // TODO: Show error message as Flash
      })
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
      axios.get(url + 'Templates?for=entity')
    ]).then(([{ data: templateData }]) => {
      this.templates = templateData
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
