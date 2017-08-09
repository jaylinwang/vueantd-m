<template>
<div>
  <v-picker
    v-model="pickerValue"
    mode="multiple"
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
      pickerData: [[
        {
          label: 0,
          text: '选项0'
        }, {
          label: 1,
          text: '选项1'
        }, {
          label: 2,
          text: '选项2'
        }, {
          label: 3,
          text: '选项3'
        }, {
          label: 4,
          text: '选项4'
        }
      ], [
        {
          label: 'A',
          text: '选项A'
        }, {
          label: 'B',
          text: '选项B'
        }, {
          label: 'C',
          text: '选项C'
        }, {
          label: 'D',
          text: '选项D'
        }
      ]],
      pickerValue: [3, 'B']
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
