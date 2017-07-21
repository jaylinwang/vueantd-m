<template>
<li
  class="v-submenu"
  :class="{
    'open': isOpen,
    'selected': isSelected
  }">
  <div
    class="v-submenu-title"
    ref="popperRef"
    @click="toggleSubmenuOpen">
    <slot name="title"></slot>
  </div>
  <div
    class="v-submenu-content-wrapper"
    :style="{
      height: isOpen ? contentHeight : 0
    }">
    <ul
      class="v-submenu-content"
      ref="content">
        <slot></slot>
    </ul>
  </div>
</li>
</template>
<script>
import Emitter from '../../../mixins/emitter.js'

export default {
  name: 'vSubmenu',

  mixins: [Emitter],

  props: {
    label: {
      type: [Number, String]
    }
  },

  data () {
    return {
      itemVisible: false,
      items: [],
      contentHeight: 0
    }
  },

  computed: {
    menu () {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.name === 'vMenu') {
          return parent
        } else {
          parent = parent.$parent
        }
      }
      return null
    },
    isOpen () {
      if (this.menu) {
        return this.menu.openLabels && this.menu.openLabels.indexOf(this.label) !== -1
      }
      return false
    },

    isSelected () {
      const vm = this
      let selected = false
      if (vm.menu) {
        vm.items.forEach((menuItem) => {
          if (menuItem.label === vm.menu.value) {
            selected = true
            return false
          }
        })
      }
      return selected
    }
  },

  updated () {
    const vm = this
    vm.$nextTick(() => {
      vm.contentHeight = `${vm.$refs.content.clientHeight}px`
    })
  },

  methods: {
    toggleSubmenuOpen () {
      this.dispatch('vMenu', 'submenu.openChange', this)
    }
  }
}
</script>
