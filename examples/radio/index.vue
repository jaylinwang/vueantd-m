<template>
<div class="container">
  <h2>basic</h2>
  <basic></basic>
  <h2>button</h2>
  <buttonDemo></buttonDemo>
  <h2>disabled</h2>
  <disabled></disabled>
  <h2>group</h2>
  <group></group>
</div>
</template>

<script>
import basic from './basic.vue'
import buttonDemo from './button.vue'
import disabled from './disabled.vue'
import group from './group.vue'

export default {
  components: {
    basic, disabled, group, buttonDemo
  }
}
</script>
