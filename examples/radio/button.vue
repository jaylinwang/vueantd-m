<template>
<div>
  <v-radio-button
    v-model="v1"
    :label="1"
    @change="v1Change">
    选项1
  </v-radio-button>
  <v-radio-button
    v-model="v1"
    :label="2"
    @change="v1Change">
    选项2
  </v-radio-button>
  <v-radio-button
    v-model="v1"
    :label="3"
    disabled
    @change="v1Change">
    选项3
  </v-radio-button>
</div>
</template>

<script>
export default {
  data () {
    return {
      v1: 1
    }
  },
  methods: {
    v1Change () {
      console.log(this.v1)
    }
  }
}
</script>
