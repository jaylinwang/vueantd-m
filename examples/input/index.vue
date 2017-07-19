<template>
<div class="container">
  <h2>autosize</h2>
  <autosize></autosize>
  <h2>textarea</h2>
  <myTextarea></myTextarea>
  <h2>basic</h2>
  <basic></basic>
  <h2>size</h2>
  <size></size>
  <h2>icon</h2>
  <icon></icon>
</div>
</template>

<script>
import basic from './basic.vue'
import size from './size.vue'
import icon from './icon.vue'
import myTextarea from './textarea.vue'
import autosize from './autosize.vue'

export default {
  components: {
    basic, size, icon, myTextarea, autosize
  }
}
</script>
