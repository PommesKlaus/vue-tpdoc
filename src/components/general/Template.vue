<template>
  <div class="questionnaire">
    <h2 class="group">Questionnaire Template</h2>

    <div class="row">
      <div class="form-group col-md-12">
        <textarea  
          v-model="template.description"
          class="form-control"
          id="memoDescription"
          placeholder="Description to be displayed on top of the questionnaire"
        ></textarea>
      </div>
    </div>

    <div v-for="(group, groupIndex) in template.groups">

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


    <a href="javascript:void(0)" @click="addGroup(jsonTemplate.groups.length)">Add Group</a>

  </div>
</template>

<script>
import settings from '../../settings/config.json'

const templateForList = settings.templateForList
const questionnaireInputTypes = settings.questionnaireInputTypes

export default {
  name: 'QTemplate',
  props: {
    jsonTemplate: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      templateForList: templateForList,
      questionnaireInputTypes: questionnaireInputTypes,
      template: JSON.parse(JSON.stringify(this.jsonTemplate))
    }
  },
  watch: {
    // Wait for props to update, then deep copy props to local data ("questionnaire")
    jsonTemplate: function () {
      this.template = JSON.parse(JSON.stringify(this.jsonTemplate))
    },
    template: {
      handler: function (val, oldval) {
        if (Object.keys(oldval).length !== 0) {
          this.$emit('input', this.template)
        }
      },
      deep: true
    }
  },
  methods: {
    updateTemplate: function (updatedData) {
      this.formData.questionnaire = updatedData
      this.saveTopic()
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
    }
  }
}
</script>
