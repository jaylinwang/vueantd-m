<template>
<div class="v-picker-group">
  <div
    class="v-picker-group-mask"
    @touchstart.stop.prevent="handleTouchStart"
    @touchmove.stop.prevent="handleTouchMove"
    @touchend.stop.prevent="handleTouchEnd"></div>
  <div class="v-picker-group-selected"></div>
  <div
    class="v-picker-content"
    :style="{
      transform: `translateY(${contentTranslateY}px)`,
      transition: `all ${transitionDuration}s`
    }">
    <div
      class="v-picker-item"
      v-for="data in dataSource"
      :key="data.label">
      {{ data.text }}
    </div>
  </div>
</div>
</template>


<script>
import Emitter from '../../../mixins/emitter.js'

export default {
  data () {
    return {
      rowHeight: 36,
      contentHeight: 36 * 7,
      offset: 3,
      startY: 0,
      endY: 0,
      contentTranslateY: 0,
      tempTranslateY: 0,
      transitionDuration: 0.3
    }
  },

  mixins: [Emitter],

  props: {
    level: { // group在当前选择器中层级
      type: Number,
      default: 0
    },
    dataSource: { // 数据来源
      type: Array
    }
  },

  computed: {
    defaultSelectedIndex () { // 默认选中项
      let current = Math.floor(this.dataSource.length / 2)
      return current
    },
    maxTranslateY () { // 最大偏移量
      return this.offset * this.rowHeight
    },
    minTranslateY () { // 最小偏移量
      return (this.offset - this.dataSource.length + 1) * 36
    },
    picker () { // group所在的picker
      let parent = this.$parent
      while (parent) {
        if (parent.$options.name === 'vPicker') {
          return parent
        } else {
          parent = parent.$parent
        }
      }
      return null
    },
    innerValue () {
      if (Array.isArray(this.picker.value)) {
        return this.picker.value[this.level]
      } else {
        return this.picker.value
      }
    },
    cascadeList () {
      return this.picker && this.picker.cascadeList
    }
  },

  watch: {
    cascadeList (list) {
      // 如果当前级联列表中找不到对应值，滚动到默认选项
      let items = list[this.level]
      let value = this.innerValue
      let selectedIndex = this.defaultSelectedIndex
      let tempItem = items.find((item) => {
        return item.label === value
      })
      if (!tempItem) {
        this.contentTranslateY = (this.offset - selectedIndex) * this.rowHeight
        this.dispatch('vPicker', 'group.change', {
          item: this.dataSource[selectedIndex],
          level: this.level
        })
      }
    }
  },

  created () {
    this._refreshSelected()
  },

  methods: {
    open () {
      this.isPickerOpen = true
    },
    cancel () {
      this.isPickerOpen = false
    },
    _refreshSelected () { // 刷新当前选中项
      let selectedIndex = this.defaultSelectedIndex
      for (let i = 0, len = this.dataSource.length; i < len; i++) {
        if (this.dataSource[i].label === this.innerValue) {
          selectedIndex = i
          break
        }
      }
      this.contentTranslateY = (this.offset - selectedIndex) * this.rowHeight
      this.dispatch('vPicker', 'group.change', {
        item: this.dataSource[selectedIndex],
        level: this.level
      })
    },
    _start (pageX) {
      this.tempTranslateY = this.contentTranslateY
      this.startY = pageX
    },
    _move (pageY) {
      this.endY = pageY
      let diff = (this.endY - this.startY)
      this.contentTranslateY = this.tempTranslateY + diff
      this.transitionDuration = 0
    },
    _end (pageY) {
      this.endY = pageY
      let diff = (this.endY - this.startY)
      this.stop(diff)
    },
    stop (diff) {
      this.tempTranslateY += diff
      this.tempTranslateY = Math.round(this.tempTranslateY / this.rowHeight) * this.rowHeight
      if (this.tempTranslateY > this.maxTranslateY) {
        this.tempTranslateY = this.maxTranslateY
      }
      if (this.tempTranslateY < this.minTranslateY) {
        this.tempTranslateY = this.minTranslateY
      }
      let index = this.offset - this.tempTranslateY / this.rowHeight
      this.contentTranslateY = this.tempTranslateY
      this.transitionDuration = 0.3
      this.dispatch('vPicker', 'group.change', {
        item: this.dataSource[index],
        level: this.level
      })
    },
    handleTouchStart (e) {
      let pageY = e.changedTouches[0].pageY
      this._start(pageY)
    },
    handleTouchMove (e) {
      let pageY = e.changedTouches[0].pageY
      this._move(pageY)
    },
    handleTouchEnd (e) {
      let pageY = e.changedTouches[0].pageY
      this._end(pageY)
    }
  }
}
</script>
