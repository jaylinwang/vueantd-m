<template>
<div>
  <v-picker
    v-model="pickerValue"
    :data-source="areaList"
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
      areaList: [],
      pickerValue: []
    }
  },

  created () {
    this.areaList = [{
      label: 'hn',
      text: '湖南省'
    }, {
      label: 'sc',
      text: '四川省'
    }]
  },

  methods: {
    handlePickerSelected (value, item) {
      console.log(value)
      console.log(item)
    },

    handlePickerChange (val, item) {
      const vm = this
      let d = [...this.areaList]
      this.areaList.forEach((i) => {
        if (val[0] === i.label) {
          if (!i.children) {
            if (val[0] === 'sc') {
              setTimeout(() => {
                i.children = [{
                  label: 'cd',
                  text: '成都市'
                }, {
                  label: 'my',
                  text: '绵阳市'
                }]
                vm.areaList = d
              }, 100)
            } else if (val[0] === 'hn') {
              setTimeout(() => {
                i.children = [{
                  label: 'cs',
                  text: '长沙市'
                }, {
                  label: 'cd',
                  text: '常德市'
                }]
              }, 100)
              vm.areaList = d
            }
          }
        }
      })
    }
  }
}
</script>
