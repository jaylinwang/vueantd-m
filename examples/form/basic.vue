<template>
<div>
<v-form
  :model="form"
  @submit="handleFormSubmit">
  <v-form-item title="输入框">
    <v-input
      v-model="form.inputVal"
      placeholder="请输入..."></v-input>
  </v-form-item>
  <v-form-item>
    <v-button
      native-type="submit"
      type="primary">提交</v-button>
  </v-form-item>
</v-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        inputVal: ''
      }
    }
  },

  methods: {
    handleFormSubmit (model) {
      console.log(model)
    }
  }
}
</script>
