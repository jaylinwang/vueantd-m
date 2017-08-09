<template>
<div>
  <v-date-picker
    v-model="date"
    :start-year="2000"
    :end-year="2040"
    @selected="handlePickerSelected">
    <span>date picker</span>
  </v-date-picker>
</div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      date: ''
    }
  },

  created () {
    const vm = this
    setTimeout(function () {
      vm.date = moment('2016-1-1')
    }, 100)
  },

  methods: {
    handlePickerSelected (date) {
      console.log(date.format('YYYY-MM-DD'))
    }
  }
}
</script>
