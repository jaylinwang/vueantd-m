<template>
<div>
  <v-masker>
    <v-button>click me</v-button>
    <div
      class="content"
      slot="content">
      这是内容
    </div>
  </v-masker>
</div>
</template>

<style scoped>
.content{
  color: #4b4b4b;
  width: 320px;
  height: 240px;
  background: #FFF;
}
</style>


<script>
export default {

}
</script>
