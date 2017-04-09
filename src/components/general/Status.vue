<template>
  <transition name="fade">
    <div v-if="compStatus.status !== 0" :class="statusCssClass" role="alert">
      <strong v-if="typeof(compStatus) === 'object'">{{ compStatus.status }} - {{ compStatus.statusText }}</strong>
      <p>{{ statusMessage }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Status',
  props: {
    status: {
      type: [Object, Number],
      required: true
    }
  },
  data () {
    return {
      compStatus: {
        status: 0,
        statusText: '',
        message: ''
      }
    }
  },
  computed: {
    statusCssClass () {
      let alertType = ''
      if (typeof (this.compStatus) !== 'object' && this.compStatus === 200) {
        alertType = 'success'
      } else {
        alertType = 'danger'
      }
      return 'text-center alert alert-' + alertType
    },
    statusMessage () {
      if (typeof (this.compStatus) !== 'object' && this.compStatus === 200) {
        return 'Data Saved'
      } else {
        return this.compStatus.message
      }
    }
  },
  watch: {
    'status': function () {
      if (typeof (this.status) === 'object') {
        this.compStatus = Object.assign({}, this.status)
      } else {
        this.compStatus = this.status
      }
    }
  }
}
</script>
