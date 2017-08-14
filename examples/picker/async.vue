<template>
<div>
  <v-picker
    v-model="pickerValue"
    :data-source="options"
    mode="cascade"
    :load-data="loadData">
    <span>picker: {{ pickerValue }}</span>
  </v-picker>
</div>
</template>

<script>
export default {
  data () {
    return {
      areaList: [],
      pickerValue: []
    }
  },

  created () {
    this.options = [{
      label: 'hn',
      text: '湖南省'
    }, {
      label: 'sc',
      text: '四川省'
    }]
  },

  methods: {
    handlePickerSelected (value, item) {
      // console.log(value)
      // console.log(item)
    },
    loadData (selectedItem, level, cb) {
      setTimeout(() => {
        if (selectedItem.label === 'sc') {
          selectedItem.children = [{
            label: 'cd',
            text: '成都'
          }, {
            label: 'my',
            text: '绵羊'
          }]
        } else if (selectedItem.label === 'hn') {
          selectedItem.children = [{
            label: 'cd',
            text: '城市一'
          }, {
            label: 'my',
            text: '城事儿'
          }]
        }
        cb()
      }, 1000)
    }
  }
}
</script>
