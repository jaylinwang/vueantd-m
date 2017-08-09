<template>
<div
  class="v-picker"
  :class="{
    'open': isPickerOpen
  }">
  <div
    class="v-picker-handle"
    @click="open">
    <slot></slot>
  </div>
   <div class="v-picker-container">
    <div class="v-picker-header">
      <div
        class="v-picker-cancel"
        @click="cancel">
        取消
      </div>
      <div
        class="v-picker-submit"
        @click="submitValue">
        确定
      </div>
    </div>
    <div class="v-picker-body">
      <template v-if="mode === 'single'">
        <PickerGroup
          :default-value="value"
          :data-source="dataSource">
        </PickerGroup>
      </template>
      <template v-if="mode === 'multiple'">
        <PickerGroup
          v-for="(data, index) in dataSource"
          :data-source="data"
          :key="index"
          :level="index">
        </PickerGroup>
      </template>
      <template v-if="mode === 'cascade'">
        <PickerGroup
          v-for="(data, index) in cascadeList"
          :data-source="data"
          :key="index"
          :level="index">
        </PickerGroup>
      </template>
    </div>
  </div>
   <div class="v-picker-mask"></div>
</div>
</template>

<script>
import PickerGroup from './picker-group.vue'

export default {
  name: 'vPicker',

  data () {
    return {
      isPickerOpen: false,
      cascadeList: [],
      initializeValue: null // 组件初始值
    }
  },

  components: {
    PickerGroup
  },

  props: {
    value: {},
    dataSource: { // 数据来源
      type: Array
    },
    mode: { // picker方式
      type: String,
      default: 'single'
    }
  },

  created () {
    this.cascadeList.push(this.dataSource)
    this.$on('group.change', this.handleGroupChange)
  },

  computed: {
    innerValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },

  methods: {
    handleGroupChange (data) {
      if (this.mode === 'single') {
        this.$emit('input', data.item.label)
      }
      if (this.mode === 'multiple') {
        this.innerValue.splice(data.level, 1, data.item.label)
      }
      if (this.mode === 'cascade') {
        this.innerValue.splice(data.level, 1, data.item.label)
        if (data.item.children) {
          this.cascadeList.splice(data.level + 1, 1, data.item.children)
        } else {
          this.cascadeList.splice(data.level + 1, 1)
        }
      }
    },
    open () {
      this.isPickerOpen = true
      // 记录初始值
      if (Array.isArray(this.value)) {
        this.initializeValue = [].concat(this.value)
      } else {
        this.initializeValue = this.value
      }
    },
    cancel () {
      this.isPickerOpen = false
      // 还原初始值
      this.$emit('input', this.initializeValue)
    },
    submitValue () {
      this.isPickerOpen = false
      let selectedItem
      if (Array.isArray(this.value)) {
        if (this.mode === 'multiple') {
          let items = this.dataSource
          selectedItem = this.value.map((val, index) => {
            return items[index].find((data) => {
              return data.label === val
            })
          })
        }
        if (this.mode === 'cascade') {
          let items = this.cascadeList
          selectedItem = this.value.map((val, index) => {
            return items[index].find((data) => {
              return data.label === val
            })
          })
        }
      } else {
        selectedItem = this.dataSource.find((data) => {
          return data.label === this.value
        })
      }
      this.$emit('selected', this.value, selectedItem)
    }
  }
}
</script>
