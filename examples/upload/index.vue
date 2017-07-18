<template>
<div class="container">
  <h3>picture-single</h3>
  <picture-single></picture-single>
  <h3>picture-card</h3>
  <picture-card></picture-card>
  <h3>picture</h3>
  <picture-basic></picture-basic>
  <h3>basic</h3>
  <basic></basic>
</div>
</template>

<script>
import basic from './basic.vue'
import pictureBasic from './picture.vue'
import pictureCard from './picture-card.vue'
import pictureSingle from './picture-single.vue'

export default {
  components: {
    basic, pictureBasic, pictureCard, pictureSingle
  }
}
</script>
