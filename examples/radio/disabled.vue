<script>
export default {
  data () {
    return {
      v1: 2,
      disabled: false
    }
  },
  methods: {
    toggleDisabled () {
      this.disabled = !this.disabled
    }
  }
}
</script>

<template>
<div>
  <v-radio
    v-model="v1"
    :label="1"
    :disabled="disabled">
    选项1
  </v-radio>
  <v-radio
    v-model="v1"
    :label="2"
    :disabled="disabled">
    选项2
  </v-radio>

  <v-button @click.native="toggleDisabled">
    toggleDisabled
  </v-button>
</div>
</template>
