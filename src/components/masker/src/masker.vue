<template>
<div class="v-masker">
  <div
    class="v-masker-handle"
    @click.capture="handleClick">
    <slot></slot>
  </div>
  <div
    class="v-masker-body"
    :class="{
      'open': isOpen
    }">
    <div class="v-masker-content">
      <slot name="content"></slot>
    </div>
    <div
      class="v-masker-mask"
      @click="handleMaskClick"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'vMasker',

  data () {
    return {
      isOpen: false
    }
  },

  methods: {
    handleClick () {
      this.isOpen = true
    },

    handleMaskClick () {
      this.isOpen = false
    }
  }
}
</script>
