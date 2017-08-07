<template>
<label class="v-radio-button"
  :class="{
    'checked': checked,
    'disabled': disabled
  }">
  <input
      class="v-radio-button-origin"
      type="radio"
      :value="label"
      :disabled="disabled"
      v-model="innerValue"
      @change="handleChange">
    <slot></slot>
</label>
</template>

<script>
export default {
  name: 'vRadioButton',

  props: {
    value: {},
    label: { // 选项的值
      type: [Number, Boolean, String]
    },
    disabled: { // 按钮启用状态
      type: Boolean,
      default: false
    }
  },

  computed: {
    inGroup () {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.name === 'vRadioGroup') {
          this._group = parent
          return true
        } else {
          parent = parent.$parent
        }
      }
      return false
    },
    innerValue: {
      get () {
        if (this.inGroup) {
          return this._group.value
        } else {
          return this.value
        }
      },
      set (val) {
        if (this.inGroup) {
          this._group.$emit('input', val)
        } else {
          this.$emit('input', val)
        }
      }
    },
    checked () {
      return this.innerValue === this.label
    }
  },
  methods: {
    handleChange () {
      if (this.inGroup) {
        this._group.$emit('change')
      } else {
        this.$emit('change')
      }
    }
  }
}
</script>
