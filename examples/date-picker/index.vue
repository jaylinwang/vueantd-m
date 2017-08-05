<template>
<div>
  <h3>basic</h3>
  <basic></basic>
  <h3>month</h3>
  <month></month>
</div>
</template>

<script>
import basic from './basic.vue'
import month from './month.vue'

export default {
  components: {
    basic, month
  }
}
</script>
