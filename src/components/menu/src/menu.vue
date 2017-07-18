<template>
<ul
  class="v-menu">
  <slot></slot>
</ul>
</template>
<script>
export default {
  name: 'vMenu',

  props: {
    value: {},
    openLabels: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  methods: {
    handleMenuItemClick (menuItem) {
      this.$emit('input', menuItem.label)
      this.$emit('select', menuItem.label, menuItem)
    },

    handleSubmenuOpenChange (submenu) {
      let label = submenu.label
      let index = this.openLabels.indexOf(label)
      if (index === -1) {
        this.openLabels.push(label)
      } else {
        this.openLabels.splice(index, 1)
      }
    }
  },

  created () {
    this.$on('menuitem.click', this.handleMenuItemClick)
    this.$on('submenu.openChange', this.handleSubmenuOpenChange)
  }
}
</script>
