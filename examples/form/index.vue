<template>
<div class="container">
  <h2>validate</h2>
  <validate></validate>
  <h2>basic</h2>
  <basic></basic>
</div>
</template>

<script>
import basic from './basic.vue'
import validate from './validate.vue'

export default {
  components: {
    basic, validate
  }
}
</script>
