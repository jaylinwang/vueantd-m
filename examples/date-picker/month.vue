<template>
<div>
  <v-month-picker
    v-model="date"
    @selected="handlePickerSelected">
    <span>month picker</span>
  </v-month-picker>
</div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      date: moment('2016-2')
    }
  },
  methods: {
    handlePickerSelected (date) {
      console.log(date.format('YYYY-MM'))
    }
  }
}
</script>
