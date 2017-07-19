<template>
<v-form
  :model="form"
  :rules="rules"
  @submit="handleFormSubmit">
  <v-form-item
    title="输入框"
    rule-name="name"
    @error="handleError">
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
</template>

<script>
export default {
  data () {
    return {
      form: {
        inputVal: ''
      },
      rules: {
        name: [{
          required: true, message: '此项必填'
        }]
      }
    }
  },

  methods: {
    handleFormSubmit (model) {
      console.log(model)
    },
    handleError (message) {
      console.log(message)
    }
  }
}
</script>
