<template>
  <div class="col-sm-9 content">

    <div class="jumbotron">
        <h1>App Settings</h1>
        <h2>Create new Templates</h2>
    </div>

    <div class="general-info">
 

    

      <div class="row">
        <p class="col-md-12">
          Please select whether you want to create a new template for "Entities" or "Transactions". In addition to that, you should
           give the template a name which will be used as a category name by the application.
        </p>
        <p class="col-md-12">
          <strong>Example:</strong>
        </p>
        <p class="col-md-12">
          You found out that you have significant transactions related to financing and want to add a special questionnaire 
          for "<em>Financing</em>". First, you should select "<em>Transaction</em>" from the "Template for"-list. Second, you 
          should enter "<em>Financing</em>" as "Name for template-type".          
        </p>
        <p class="col-md-12">
          As a result, users will be able to add new <em>Financing</em>-Transactions, guided by the special questionnaire you
          are going to add in the next step. In addition to that, "<em>Financing</em>" will be shown as a Transaction-category in
          the entity overview and the rendered report.
        </p>
      </div>

    <form @submit.prevent="saveTemplate">

      <div class="row">
        <div class="form-group col-md-6">
          <label for="selectFor">Template for</label>
          <select class="form-control" id="selectFor" v-model="formData.for" required>
            <option v-for="(forItem, index) in templateForList" :value="forItem.name">
              {{ forItem.display }}
            </option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="inputVersion">Template Version</label>
          <input v-model="formData.version" id="inputVersion" class="form-control">
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-12">
          <label for="inputType">Name for the template-type (will be displayed as Transaction Category in the menu)</label>
          <input 
            v-model="formData.type" 
            id="inputType" 
            placeholder="e.g. 'Corporation' or 'Finance Transactions'"
            class="form-control"
            required
          >
        </div>
      </div>

      <div class="row">
        <div class="text-center">
          <button class="btn btn-success" type="submit"><i class="fa fa-save"></i>Save Template and edit questionnaire</button>
        </div>
      </div>

    </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import settings from '../../settings/config.json'
import router from '../../router'

const url = settings.apiUrl
const templateForList = settings.templateForList

export default {
  name: 'newTemplate',
  data () {
    return {
      templateForList: templateForList,
      formData: {
        for: '',
        type: '',
        version: '1.0',
        questionnaire: {
          description: '',
          groups: []
        }
      }
    }
  },
  methods: {
    saveTemplate: function (evt) {
      axios.post(url + 'Templates', this.formData)
      .then(function (response) {
        let templateId = response.data._id
        router.push({ name: 'TemplateDetail', params: { id: templateId } })
      })
      .catch(function (error) {
        console.log(error)
        // TODO: Show error message as Flash
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  margin-top: 20px;
}
</style>
