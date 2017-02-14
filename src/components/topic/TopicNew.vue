<template>
  <div>
    <h1>Create new Dealing/Topic</h1>

    <div class="general-info">
      <h2 class="group">Master Data</h2>

      <form @submit.prevent="saveTopic">

        <div class="row">
          <div class="form-group col-md-12">
            <label for="selectType">Dealing Type</label>
            <select class="form-control" id="selectType" v-model="formData.type">
              <option v-for="option in templates" v-bind:value="option.type">
                {{ option.type }}
              </option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-12">
            <label for="inputName">Name</label>
            <input type="text" class="form-control" id="inputName" placeholder="" v-model="formData.name">
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="inputBegin">Transaction Begin</label>
            <input type="date" class="form-control" id="inputBegin" placeholder="" v-model="formData.begin">
          </div>
          <div class="form-group col-md-6">
            <label for="inputEnd">Transaction End</label>
            <input type="date" class="form-control" id="inputEnd" placeholder="" v-model="formData.end">
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="selectEntity">Select involved entities</label>
            <select class="form-control" id="selectEntity" v-model="formData.entities" multiple>
              <option v-for="(entity, index) in entities" v-bind:value="entity">
                {{ entity.name }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label>Selected Entities</label>
            <ul>
              <li v-for="(entity, index) in formData.entities">
                <country :iso-code="entity.country"></country>
                {{ entity.name }}
              </li>
            </ul>
          </div>
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
</template>

<script>
import axios from 'axios'
import settings from '../../settings/config.json'
// import router from '../../router/'
import Country from '../general/CountryFlag'

const url = settings.apiUrl

export default {
  name: 'newTopic',
  components: {
    'country': Country
  },
  data () {
    return {
      templates: [],
      entities: [],
      formData: {
        name: '',
        type: '',
        begin: '',
        end: '',
        entities: [],
        questionnaire: {}
      }
    }
  },
  methods: {
    saveTopic: function (evt) {
      axios.post(url + 'Topics', this.formData)
      .then(function (response) {
        // let topicId = response.data._id
        // router.push({ name: 'TopicDetail', params: { id: topicId } })
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
      axios.get(url + 'Templates?for=topic'),
      axios.get(url + 'Entities')
    ]).then(([{ data: templateData }, { data: entityData }]) => {
      this.templates = templateData
      this.entities = entityData
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
