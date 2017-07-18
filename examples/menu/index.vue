<template>
<div>
  <h2>basic</h2>
  <basic></basic>
  <h2>default</h2>
  <defaultValue></defaultValue>
</div>
</template>

<script>
import basic from './basic.vue'
import defaultValue from './default.vue'

export default {
  components: {
    basic, defaultValue
  }
}
</script>
