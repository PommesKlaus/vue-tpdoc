<template>
  <div>
    <h1>Entity Details</h1>
    <h2 class="text-center">
      {{ formData.name }} ({{ formData.shortname }}) 
      <br />
      <span :class="countryCssClass" v-bind:title="countryTitle"></span>
      <small class="text-muted">{{ formData.type }}</small>
    </h2>

    <div v-if="error">
      {{ error }}
    </div>

    <questionnaire v-model="formData.questionnaire"></questionnaire>

    <button class="btn btn-success" v-on:click="saveEntity"><i class="fa fa-save"></i> Save Entity</button>

  </div>
</template>

<script>
import axios from 'axios'
import countries from '../settings/countries.json'
import settings from '../settings/config.json'
import Questionnaire from './Questionnaire'

const url = settings.apiUrl

export default {
  name: 'EntityDetail',
  components: {
    'questionnaire': Questionnaire
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
      }
    }
  },
  methods: {
    fetchData () {
      axios.get(url + 'Entities/' + this.$route.params.id)
      .then((res) => {
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
        console.log(response)
        // TODO: Redirect to Company-Detail View
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
  computed: {
    countryCssClass: function () {
      return 'flag-icon flag-icon-' + this.formData.country.toLowerCase()
    },
    countryTitle: function () {
      let iso = this.formData.country || 'DE'
      return countries.find(function (country) {
        return country.code === iso
      }).name
    }
  },
  beforeMount () {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
