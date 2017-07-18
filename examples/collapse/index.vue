<template>
<div>
  <h2>basic</h2>
  <basic></basic>
  <h2>accordion</h2>
  <accordion></accordion>
</div>
</template>

<script>
import basic from './basic.vue'
import accordion from './accordion.vue'

export default {
  components: {
    basic, accordion
  }
}
</script>
