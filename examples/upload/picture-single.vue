<template>
  <div>
    <v-upload
      v-model="fileList"
      action="http://upload.qiniu.com/"
      :data="data"
      list-type="picture-single"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      compress>
    </v-upload>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        token: 'AJbFeJvpHXUOrGXkSHbhcbreUIJQx1WU7FF8TXAA:iJN_IYbyDePXoyO9A6my4KsMRW4=:eyJzY29wZSI6InRlc3QiLCJkZWFkbGluZSI6MTUwMjEwMDk1M30=',
        key: new Date().getTime()
      },
      fileList: []
    }
  },
  watch: {
    fileList (val) {
      console.log(val)
    }
  },

  methods: {
    beforeUpload () {
      this.data.key = new Date().getTime()
      return true
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>
