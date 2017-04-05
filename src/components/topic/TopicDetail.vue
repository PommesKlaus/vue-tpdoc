<template>
  <div>
    <h1>Dealing Details</h1>

    <div v-if="formData._id === ''" class="text-center">
      <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>

    <div v-else>

      <h2 class="text-center">
        {{ formData.name }} 
        <br />
        <small class="text-muted">{{ formData.type }}</small>
      </h2>

      <div class="row">
        <div class="col-md-3">
          Timeframe:
        </div>
        <div class="col-md-9">
          <span v-if="formData.begin !== ''">{{ formData.begin }}</span><span v-else>&#8734;</span> - 
          <span v-if="formData.end !== ''">{{ formData.end }}</span><span v-else>&#8734;</span>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          Participating entities:
        </div>
        <div class="col-md-9">
          <ul class="clear-list">
              <li v-for="(entity, index) in formData.entities" class="clear-list-item">
                <country :iso-code="entity.country"></country>
                {{ entity.name }} 
                <span v-if="entity.shortname !== ''">({{ entity.shortname }})</span>
              </li>
            </ul>
        </div>
      </div>

      <div v-if="error">
        {{ error }}
      </div>

      <questionnaire :json-questionnaire="initialQuestionnaire" @input="updateQuestionnaire" v-if="initialQuestionnaire"></questionnaire>

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
  name: 'TopicDetail',
  components: {
    'questionnaire': Questionnaire,
    'country': Country
  },
  data () {
    return {
      error: false,
      formData: {
        _id: '',
        name: '',
        type: '',
        begin: '',
        end: '',
        entities: [],
        questionnaire: {}
      },
      initialQuestionnaire: {}
    }
  },
  methods: {
    updateQuestionnaire: function (updatedData) {
      this.formData.questionnaire = updatedData
      this.saveTopic()
    },
    fetchData: function () {
      axios.get(url + 'Topics/' + this.$route.params.id)
      .then((res) => {
        this.initialQuestionnaire = JSON.parse(JSON.stringify(res.data.questionnaire))
        this.formData = res.data
      })
      .catch((error) => {
        this.error = error.toString()
      })
    },
    saveTopic: function (evt) {
      let payload = Object.assign({}, this.formData)
      delete payload._id
      axios.put(url + 'Topics/' + this.$route.params.id, payload)
      .then(function (response) {
        console.log('Topic saved!')
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
.clear-list {
  padding-left: 0px;
}

.clear-list-item {
  list-style-type: none;
}
</style>
