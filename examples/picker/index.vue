<template>
<div class="container">
  <!-- <h3>basic</h3>
  <basic></basic>
  <h3>multiple</h3>
  <multiple></multiple> -->
  <!-- <h3>cascade</h3>
   <cascade></cascade> -->
   <h3>async</h3>
   <async></async>
</div>
</template>

<script>
import basic from './basic.vue'
import multiple from './multiple.vue'
import cascade from './cascade.vue'
import async from './async.vue'

export default {
  components: {
    basic, multiple, cascade, async
  }
}
</script>
