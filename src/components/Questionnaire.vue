<template>
  <div class="questionnaire">
    <p class="lead">{{ value.description }}</p>

    <div v-for="(group, groupIndex) in value.groups">
      <h2 class="group">{{ group.title }}</h2>
      <p>{{ group.description }}</p>

      <div v-for="(question, questionIndex) in group.questions" class="row">
        <div class="col-md-3"><label v-bind:for="groupIndex + '.' + questionIndex">{{ question.title }}</label></div>

        <div class="col-md-9">

          <!-- text -->
          <input 
            type="text" 
            v-if="question.inputType === 'text'" 
            v-model="question.value"
            class="form-control"
            v-bind:placeholder="question.placeholder"
            v-bind:id="groupIndex + '.' + questionIndex"
          >

          <!-- memo -->
          <textarea 
            v-if="question.inputType === 'memo'" 
            v-model="question.value"
            class="form-control"
            v-bind:placeholder="question.placeholder"
            v-bind:id="groupIndex + '.' + questionIndex"
          ></textarea>


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
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log('MOUNTED!')
  }
}
</script>
