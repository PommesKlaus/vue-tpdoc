<template>
  <div class="questionnaire">
    <p class="lead">{{ questionnaire.description }}</p>

    <div v-for="(group, groupIndex) in questionnaire.groups">
      <h2 class="group">{{ group.title }}</h2>
      <p>{{ group.description }}</p>

      <div v-for="(question, questionIndex) in group.questions" class="row">
        <div class="col-md-3"><label v-bind:for="groupIndex + '.' + questionIndex">{{ question.title }}</label></div>

        <div class="col-md-9">

          <!-- text -->
          <input 
            type="text" 
            v-if="question.inputType === 'text'" 
            v-model.lazy="question.value"
            class="form-control"
            v-bind:placeholder="question.placeholder"
            v-bind:id="groupIndex + '.' + questionIndex"
          >

          <!-- memo -->
          <textarea 
            v-if="question.inputType === 'memo'" 
            v-model.lazy="question.value"
            class="form-control"
            v-bind:placeholder="question.placeholder"
            v-bind:id="groupIndex + '.' + questionIndex"
          ></textarea>

          <!-- Display a small hint with the question description below the form field -->
          <small class="form-text text-muted">{{ question.description }}</small>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Questionnaire',
  props: {
    jsonQuestionnaire: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      questionnaire: JSON.parse(JSON.stringify(this.jsonQuestionnaire))
    }
  },
  watch: {
    // Wait for props to update, then deep copy props to local data ("questionnaire")
    jsonQuestionnaire: function () {
      this.questionnaire = JSON.parse(JSON.stringify(this.jsonQuestionnaire))
    },
    questionnaire: {
      handler: function (val, oldval) {
        if (Object.keys(oldval).length !== 0) {
          this.$emit('input', this.questionnaire)
        }
      },
      deep: true
    }
  }
}
</script>
