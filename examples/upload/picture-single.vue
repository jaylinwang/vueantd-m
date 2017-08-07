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
        token: 'AJbFeJvpHXUOrGXkSHbhcbreUIJQx1WU7FF8TXAA:i4spkoWEPnQmVAn1vd9EzTtPmnM=:eyJzY29wZSI6InRlc3QiLCJkZWFkbGluZSI6MTUwMjA5NjQ4Mn0=',
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
