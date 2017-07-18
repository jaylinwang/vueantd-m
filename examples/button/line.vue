<template>
<div class="line-container">
  <v-button
    class="line-button"
    type="primary">
    Primary
  </v-button>
  <v-button
    class="line-button">
    Default
  </v-button>
  <v-button
    type="dashed"
    class="line-button">
    Dashed
  </v-button>
  <v-button
    class="line-button"
    type="danger">
    Danger
  </v-button>
</div>
</template>

<style scoped>
.line-container{
  padding-left: 16px;
  padding-right: 16px;
}
.line-button{
  width: 100%;
  margin-bottom: 16px;
}
</style>

<script>
export default {

}
</script>
