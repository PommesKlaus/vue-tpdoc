<template>
  <div>
    <h1>Entity Details</h1>

    <div v-if="formData._id === ''" class="text-center">
      <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>

    <div v-else>

      <h2 class="text-center">
        {{ formData.name }} ({{ formData.shortname }}) 
        <br />
        <country :iso-code="formData.country"></country>
        <small class="text-muted">{{ formData.type }}</small>
      </h2>

      <div v-if="error">
        {{ error }}
      </div>

      <questionnaire v-bind:json-questionnaire="initialQuestionnaire" @input="updateQuestionnaire" v-if="initialQuestionnaire"></questionnaire>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
import settings from '../../settings/config.json'
import Questionnaire from '../general/Questionnaire'
import Country from '../general/CountryFlag'

const url = settings.apiUrl

export default {
  name: 'EntityDetail',
  components: {
    'questionnaire': Questionnaire,
    'country': Country
  },
  data () {
    return {
      error: false,
      formData: {
        _id: '',
        shortname: '',
        name: '',
        country: '',
        type: '',
        questionnaire: {}
      },
      initialQuestionnaire: {}
    }
  },
  methods: {
    updateQuestionnaire: function (updatedData) {
      this.formData.questionnaire = updatedData
      this.saveEntity()
    },
    fetchData: function () {
      axios.get(url + 'Entities/' + this.$route.params.id)
      .then((res) => {
        this.initialQuestionnaire = JSON.parse(JSON.stringify(res.data.questionnaire))
        this.formData = res.data
      })
      .catch((error) => {
        this.error = error.toString()
      })
    },
    saveEntity: function (evt) {
      let payload = Object.assign({}, this.formData)
      delete payload._id
      axios.put(url + 'Entities/' + this.$route.params.id, payload)
      .then(function (response) {
        console.log('Entity saved!')
      })
      .catch(function (error) {
        console.log(error)
        // TODO: Show error message as Flash
      })
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created () {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
