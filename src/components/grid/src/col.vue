<template>
  <div :class="classList" :style="styleObj">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'vCol',

    props: {
      span: {
        type: Number,
        default: 0
      },
      order: Number,
      offset: Number,
      push: Number,
      pull: Number
    },

    computed: {
      classList () {
        const list = []
        if (this.span > 0) {
          list.push(`v-col-${this.span}`)
        }
        if (this.offset) {
          list.push(`v-col-offset-${this.offset}`)
        }
        if (this.push) {
          list.push(`v-col-push-${this.push}`)
        }
        if (this.pull) {
          list.push(`v-col-pull-${this.pull}`)
        }
        return list
      },
      styleObj () {
        const style = {}
        const gutter = this.$parent.gutter
        if (gutter && gutter > 0) {
          style.paddingLeft = `${gutter / 2}px`
          style.paddingRight = style.paddingLeft
        }
        return style
      }
    }
  }
</script>
