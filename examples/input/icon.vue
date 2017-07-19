<template>
<div>
<p>
  <v-input
    v-model="iconValue"
    size="small"
    icon="search"
    placeholder="Small size input"
    @iconClick="handleIconClick">
  </v-input>
</p>
<p>
  <v-input
    v-model="iconValue"
    icon="up"
    placeholder="Basic size input"
    @iconClick="handleIconClick">
  </v-input>
</p>
<p>
  <v-input
    v-model="iconValue"
    icon="list"
    size="large"
    placeholder="Large size input"
    @iconClick="handleIconClick">
  </v-input>
</p>
</div>
</template>

<script>
export default {
  data () {
    return {
      iconValue: ''
    }
  },
  methods: {
    handleIconClick (val) {
      console.log(val)
    }
  }
}
</script>
