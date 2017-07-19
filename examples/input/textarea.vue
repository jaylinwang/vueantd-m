<template>
<v-input
  type="textarea"
  placeholder="文本输入..."
  v-model="text">
</v-input>
</template>
<script>
export default {
  data () {
    return {
      text: ''
    }
  }
}
</script>
