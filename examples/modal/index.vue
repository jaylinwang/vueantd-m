<template>
<div>
  <h2>basic</h2>
  <basic></basic>
  <h2>custom</h2>
  <custom></custom>
  <h2>fast</h2>
  <fast></fast>
</div>
</template>

<script>
import basic from './basic.vue'
import custom from './custom.vue'
import fast from './fast.vue'

export default {
  components: {
    basic, custom, fast
  }
}
</script>
