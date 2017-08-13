<template>
<div>
  <v-picker
    v-model="pickerValue"
    :data-source="pickerData"
    mode="cascade"
    @selected="handlePickerSelected"
    @change="handlePickerChange">
    <span>picker: {{ pickerValue }}</span>
  </v-picker>
</div>
</template>

<script>
export default {
  data () {
    return {
      pickerData: [{
        text: '飞机票',
        label: 0,
        children: [{
          text: '经济舱',
          label: 1
        },
        {
          text: '商务舱',
          label: 2
        }]
      },
      {
        text: '火车票',
        label: 1,
        children: [{
          text: '卧铺',
          label: 1,
          disabled: true // 不可用
        },
        {
          text: '坐票',
          label: 2
        },
        {
          text: '站票',
          label: 3
        }]
      },
      {
        text: '汽车票',
        label: 3,
        children: [{
          text: '快班',
          label: 1
        },
        {
          text: '普通',
          label: 2
        }]
      }],
      pickerValue: []
    }
  },
  methods: {
    handlePickerSelected (value, item) {
      console.log(value)
      console.log(item)
    },
    handlePickerChange (val, level) {
      console.log(val)
    }
  }
}
</script>
