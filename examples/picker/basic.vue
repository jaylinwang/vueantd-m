<template>
<div>
  <v-picker
    v-model="pickerValue"
    :data-source="pickerData"
    @selected="handlePickerSelected">
    <span>picker: {{ pickerValue }}</span>
  </v-picker>
</div>
</template>

<script>
export default {
  data () {
    return {
      pickerData: [
        {
          label: 0,
          text: '飞机票'
        }, {
          label: 1,
          text: '火车票'
        }, {
          label: 2,
          text: '汽车票'
        }, {
          label: 3,
          text: '公车票'
        }, {
          label: 5,
          text: '其他'
        }
      ],
      pickerValue: null
    }
  },
  methods: {
    handlePickerSelected (value, item) {
      console.log(value)
      console.log(item)
    }
  }
}
</script>
