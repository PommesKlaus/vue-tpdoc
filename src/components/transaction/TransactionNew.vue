<template>
  <div>

    <header>
      <header-nav></header-nav>
    </header>

    <main>
      <div class="container">

        <div class="col-sm-3">
          <p class="text-center"><i class="fa fa-pencil fa-5" aria-hidden="true"></i></p>
        </div>

        <div class="col-sm-9 content">

          <div class="jumbotron">
            <h1>Transaction</h1>
            <h2>Add new</h2>
          </div>

          <div v-if="error!==''" class="alert alert-danger" role="alert">
            {{ error }}
          </div>

          <div class="general-info">
            <h2 class="group">Master Data</h2>

            <form @submit.prevent="saveTransaction">

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
                  <label>Select involved entities</label>
                  <div class="multiselect-div">
                    <table class="table table-sm">
                      <col style="width: 60px">
                      <col>
                      <thead>
                        <tr>
                          <th class="text-center"><i class="fa fa-globe" aria-hidden="true"></i></th>
                          <th>Name</th>
                        </tr>
                        <tr>
                          <td><input class="form-control form-control-sm country-filter-input" v-model="countryFilter" placeholder=""></td>
                          <td><input class="form-control form-control-sm" v-model="companyNameFilter" placeholder=""></td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(entity, index) in filteredEntities">
                          <td class="text-center"><country :iso-code="entity.country"></country></td>
                          <td><a href="javascript:void(0)" @click="addEntity(entity)">{{ entity.name }} <span v-if="entity.shortname !== ''">({{ entity.shortname }})</span></a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <label>Selected entities</label>
                  <ul class="clear-list">
                    <li v-for="(entity, index) in formData.entities" class="clear-list-item">
                      <a href="javascript:void(0)" @click="removeEntity(entity, index)">
                        <country :iso-code="entity.country"></country>
                        {{ entity.name }} 
                        <span v-if="entity.shortname !== ''">({{ entity.shortname }})</span>
                      </a>
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

      </div>
    </main>

  </div>
</template>

<script>
import axios from 'axios'
import settings from '../../settings/config.json'
import router from '../../router/'
import Country from '../general/CountryFlag'
import HeaderNav from '../header/HeaderNav'

const url = settings.apiUrl

export default {
  name: 'TransactionNew',
  components: {
    'header-nav': HeaderNav,
    'country': Country
  },
  data () {
    return {
      error: '',
      templates: [],
      entities: [],
      countryFilter: '',
      companyNameFilter: '',
      formData: {
        name: '',
        type: '',
        begin: '1900-01-01',
        end: '2999-12-31',
        entities: [],
        questionnaire: {}
      }
    }
  },
  methods: {
    saveTransaction: function (evt) {
      axios.post(url + 'transactions', this.formData)
      .then(function (response) {
        let transactionId = response.data._id
        router.push({ name: 'TransactionDetail', params: { id: transactionId } })
      })
      .catch(err => {
        this.error = err.response.data.message
      })
    },
    addEntity: function (entity) {
      let index = this.entities.indexOf(entity)
      this.formData.entities.push(entity)
      this.entities.splice(index, 1)
    },
    removeEntity: function (entity, index) {
      this.entities.push(entity)
      this.formData.entities.splice(index, 1)
    }
  },
  computed: {
    filteredEntities: function () {
      let filteredByCountry = this.entities.filter((e) => {
        return e.country.toLowerCase().includes(this.countryFilter.toLowerCase())
      })
      return filteredByCountry.filter((e) => {
        let entityName = e.name.toLowerCase() + e.shortname.toLowerCase()
        return entityName.includes(this.companyNameFilter.toLowerCase())
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
  created () {
    axios.all([
      axios.get(url + 'templates?for=transaction'),
      axios.get(url + 'entities')
    ]).then(([{ data: templateData }, { data: entityData }]) => {
      this.templates = templateData
      this.entities = entityData
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
