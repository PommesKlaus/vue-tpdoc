<template>
  <div class="col-sm-9 content">

    <div class="jumbotron">
        <h1>App Settings</h1>
        <h2>Create new Templates</h2>
    </div>

    <div class="general-info">
 

    <form @submit.prevent="saveTemplate">

      <h2 class="group">Master Data</h2>

      <div class="row">
        <div class="form-group col-md-6">
          <label for="selectFor">Template for</label>
          <select class="form-control" id="selectFor" v-model="formData.for">
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
          >
        </div>
      </div>
      

      <!--<h2 class="group">Create Questionnaire Template</h2>

      <div class="row">
        <div class="form-group col-md-12">
          <textarea  
            v-model="formData.questionnaire.description"
            class="form-control"
            id="memoDescription"
            placeholder="Description to be displayed on top of the questionnaire"
          ></textarea>
        </div>
      </div>

      <div v-for="(group, groupIndex) in formData.questionnaire.groups">

        <a href="javascript:void(0)" @click="addGroup(groupIndex)">Add Group</a>

        <a href="javascript:void(0)" @click="deleteGroup(groupIndex)" class="pull-right">
          <i class="fa fa-times-circle" aria-hidden="true" title="DELETE ENTIRE GROUP"></i>
        </a>
        
        <div class="row">
          <div class="form-group col-md-12 group">
            <input 
              :id="'inputGroup.' + groupIndex" 
              :value="group.title" 
              @input="group.title = $event.target.value"
              placeholder="Name of the Group"
              class="form-control form-control-lg"
            >
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-12">
            <textarea 
              :id="'inputGroupDescription.' + groupIndex" 
              :value="group.description" 
              @input="group.description = $event.target.value"
              placeholder="Description of the Group"
              class="form-control"
            ></textarea>
          </div>
        </div>

        <div v-for="(question, questionIndex) in group.questions">

          <div class="row">
            <div class="col-md-12">
              <a href="javascript:void(0)" @click="addQuestion(group, questionIndex)">Add Question</a>
            </div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-11">

              <div class="card">
                <div class="card-header">
                  New Question <small>Pos. {{ groupIndex + 1 }}.{{ questionIndex + 1 }}</small>
                  <a href="javascript:void(0)" @click="deleteQuestion(group, questionIndex)" class="pull-right">
                    <i class="fa fa-times-circle" aria-hidden="true" title="DELETE QUESTION"></i>
                  </a>
                </div>
                <div class="card-block">

                  <div class="row">
                    <div class="col-md-12">
                      <label :for="'inputQuestionTitle.' + groupIndex + '.' + questionIndex">Question Title:</label>
                      <input 
                        :id="'inputQuestionTitle.' + groupIndex + '.' + questionIndex" 
                        :value="question.title" 
                        @input="question.title = $event.target.value"
                        placeholder="Please ask a precise question to be answered"
                        class="form-control"
                      >
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      <label :for="'inputQuestionType.' + groupIndex + '.' + questionIndex">Input Type:</label>
                      <select 
                        class="form-control" 
                        :id="'inputQuestionType.' + groupIndex + '.' + questionIndex"
                        :value="question.type"
                        @input="question.type = $event.target.value"
                      >
                        <option v-for="(typeItem, index) in questionnaireInputTypes" :value="typeItem">
                          {{ typeItem }}
                        </option>
                      </select>
                    </div>

                    <div class="col-md-8">
                      <label :for="'inputQuestionPlaeholder.' + groupIndex + '.' + questionIndex">Input Placeholder:</label>
                      <input 
                        :id="'inputQuestionPlaceholder.' + groupIndex + '.' + questionIndex" 
                        :value="question.placeholder" 
                        @input="question.placeholder = $event.target.value"
                        class="form-control"
                      >
                    </div>
                  </div>
                

                  <div class="row">
                    <div class="col-md-12">
                      <label :for="'inputQuestionDescription.' + groupIndex + '.' + questionIndex">Description to the question</label>
                      <textarea 
                        :id="'inputQuestionDescription.' + groupIndex + '.' + questionIndex"
                        :value="question.description" 
                        @input="question.description = $event.target.value"
                        class="form-control"
                      ></textarea>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        <a href="javascript:void(0)" @click="addQuestion(group, group.questions.length)">Add Question</a>

      </div>


      <a href="javascript:void(0)" @click="addGroup(formData.questionnaire.groups.length)">Add Group</a>
-->

      <qtemplate :json-template="initialTemplate" @input="updateTemplate" v-if="initialTemplate"></qtemplate>

      <div class="row">
        <div class="center">
          <button class="btn btn-success" type="submit"><i class="fa fa-save"></i> Save Template</button>
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
import QTemplate from '../general/Template'

const url = settings.apiUrl
const templateForList = settings.templateForList
const questionnaireInputTypes = settings.questionnaireInputTypes

export default {
  name: 'detailTemplate',
  components: {
    'qtemplate': QTemplate
  },
  data () {
    return {
      templateForList: templateForList,
      questionnaireInputTypes: questionnaireInputTypes,
      formData: {
        for: '',
        type: '',
        version: '1.0',
        questionnaire: {
          description: '',
          groups: []
        }
      },
      initialTemplate: {}
    }
  },
  methods: {
    saveTemplate: function (evt) {
      axios.post(url + 'Templates', this.formData)
      .then(function (response) {
        console.log('New template successfully created')
        router.push({ name: 'TemplateList', params: {} })
      })
      .catch(function (error) {
        console.log(error)
        // TODO: Show error message as Flash
      })
    },
    addGroup: function (groupPos) {
      this.formData.questionnaire.groups.splice(groupPos, 0, {
        title: '',
        description: '',
        questions: []
      })
    },
    deleteGroup: function (groupPos) {
      this.formData.questionnaire.groups.splice(groupPos, 1)
    },
    addQuestion: function (group, questionPos) {
      group.questions.splice(questionPos, 0, {
        title: '',
        type: '',
        placeholder: '',
        description: ''
      })
    },
    deleteQuestion: function (group, questionPos) {
      group.questions.splice(questionPos, 1)
    },
    updateTemplate: function (updatedData) {
      this.formData.questionnaire = updatedData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
