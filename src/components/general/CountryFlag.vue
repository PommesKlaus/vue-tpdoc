<template>
  <span :class="countryCssClass" v-bind:title="countryTitle"></span>
</template>

<script>
import countries from '../../settings/countries.json'

export default {
  name: 'CountryFlag',
  props: {
    isoCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    // Some computed names for representation of Country Flag and Name
    countryCssClass: function () {
      return 'flag-icon flag-icon-' + this.isoCode.toLowerCase()
    },
    countryTitle: function () {
      let iso = this.isoCode || 'DE'
      return countries.find(function (country) {
        return country.code === iso
      }).name
    }
  }
}
</script>
