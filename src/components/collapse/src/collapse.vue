<template>
<div
  class="v-collapse">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'vCollapse',

  props: {
    value: {}
  }
}
</script>
