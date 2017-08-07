<template>
<div class="v-upload">
  <input
      class="v-upload-select-origin"
      type="file"
      ref="upload"
      @change="handleFileChange">
  <!-- 除picture-card模式的上传触发按钮 -->
  <div
    class="v-upload-select"
    v-if="listType !== 'picture-card' &&
          listType !== 'picture-single'">
    <div
      class="v-upload-select-handle"
      @click.capture="toggleUpload">
      <slot>
        <v-button>
          <v-icon type="cloudup"></v-icon> 点击上传
        </v-button>
      </slot>
    </div>
    <slot name="placeholder"></slot>
  </div>
  <!-- 文件传输列表 -->
  <div
    class="v-upload-list"
    :class="['v-upload-list-' + listType]"
    v-if="showUploadList">
    <div
      class="v-upload-list-item"
      v-for="(transfer, index) in transferList"
      ref="uploadListItem"
      :key="index"
      :class="[transfer.status]"
      @click="handleItemPreview(transfer)">
      <div class="v-upload-list-item-title">
        <template v-if="listType === 'text'">
          <v-icon
            v-if="transfer.status === 'uploading'"
            type="loading" spin></v-icon>
          <v-icon
            v-else
            type="attachment"></v-icon>
        </template>
        <template v-else>
          <v-icon
            v-if="transfer.status === 'uploading' ||
                  !transfer.url"
            type="picture">
          </v-icon>
          <div
            class="img-box"
            v-else>
            <img
              :src="transfer.url"
              :alt="transfer.name">
          </div>

        </template>
        <span>{{transfer && transfer.name }}</span>
      </div>
      <div
        class="v-upload-list-item-progress"
        v-if="transfer.status === 'uploading'">
        <v-progress
          class="v-upload-progress"
          :percent="transfer && transfer.progress"
          :stroke-width="2"
          hide-info></v-progress>
      </div>
      <template v-else>
        <div
          class="v-upload-list-item-status"
          v-if="transfer.status === 'error'">
          <v-icon type="warning-circle"></v-icon>
        </div>
        <div
          class="v-upload-list-item-status"
          v-if="transfer.status === 'success'">
          <v-icon type="check-circle"></v-icon>
        </div>
        <div
          class="v-upload-list-item-mask"
          v-if="listType === 'picture-card' ||
                listType === 'picture-single'">
          <span
            @click.stop="handleItemPreview(transfer)">
            <v-icon type="eye"></v-icon>
          </span>
          <span
            v-if="listType === 'picture-single'"
            @click.stop="toggleUpload">
            <v-icon type="edit"></v-icon>
          </span>
          <span
            @click.stop="handleItemDelete(transfer)">
            <v-icon type="delete"></v-icon>
          </span>
        </div>
        <div
          class="v-upload-list-item-remove"
          v-else
          @click="handleItemDelete(transfer)">
          <v-icon type="delete"></v-icon>
        </div>
      </template>
    </div>
    <div
      class="v-upload-select"
      v-if="listType === 'picture-card' ||
            (listType === 'picture-single' && transferList.length == 0)">
      <v-button
        @click="toggleUpload">
        <v-icon type="plus"></v-icon>
      </v-button>
    </div>
  </div>
</div>
</template>

<script>
import { compressFile } from './FileUtil'
import FileUpload from './FileUpload'
import uuid from 'uuid'

export default {
  name: 'vUpload',

  data () {
    return {
      preview: {
        visible: false,
        url: null,
        name: null
      },
      transferList: []
    }
  },

  props: {
    value: {},
    name: { // 后台接收的参数名
      type: String,
      default: 'file'
    },
    action: { // 请求地址
      type: String,
      required: true
    },
    data: { // 附加数据
      type: Object
    },
    headers: { // 附加header
      type: Object
    },
    disabled: { // 是否禁用
      type: Boolean,
      default: false
    },
    autoUpload: { // 是否选择后立即上传
      type: Boolean,
      default: true
    },
    beforeUpload: { // 上传前的处理
      type: Function
    },
    showUploadList: { // 展示上传列表
      type: Boolean,
      default: true
    },
    listType: { // 上传列表样式
      type: String,
      default: 'text'
    },
    defaultPreview: { // 默认预览样式
      type: Boolean,
      default: true
    },
    compress: { // 是否压缩
      type: Boolean,
      default: false
    }
  },

  watch: {
    value (val) {
      this.transferList = val
    }
  },

  created () {
    const vm = this
    vm.value && vm.value.forEach((val) => {
      let id = uuid.v1()
      vm.transferList.push({
        id: val.id || id,
        url: val.url,
        name: val.name,
        progress: 100,
        status: 'success'
      })
    })
  },

  methods: {
    toggleUpload () {
      this.$refs.upload.click()
    },

    handleUploadLoad (e, file, xhr) {
      const vm = this
      let transfer = this.transferList.find((data) => {
        return data.raw === file
      })
      if (!transfer) {
        return
      }
      // 此处为了进度条可显示
      setTimeout(function () {
        transfer.progress = 100
        transfer.status = 'success'
        transfer.response = xhr.response
        vm.$emit('input', vm.transferList)
        vm.$emit('success', transfer)
      }, 100)
    },

    handleUploadError (e, file, xhr) {
      const vm = this
      let transfer = this.transferList.find((data) => {
        return data.raw === file
      })
      if (!transfer) {
        return
      }
      // 此处为了进度条可显示
      setTimeout(function () {
        transfer.progress = 0
        transfer.status = 'error'
        transfer.response = xhr.response
        vm.$emit('input', vm.transferList)
        vm.$emit('error', transfer)
      }, 100)
    },

    handleUploadProgress (event, file) {
      let percent = (event.loaded / event.total).toFixed(4) * 100
      let transfer = this.transferList.find((data) => {
        return data.raw === file
      })
      if (!transfer) {
        return
      }
      transfer.progress = percent
      this.$emit('progress', transfer)
    },

    upload (action, file) {
      const vm = this
      this.$refs.upload.value = '' // 开始上传后清空file选择
      let transfer = this.transferList.find((data) => {
        return data.raw === file
      })
      if (!transfer) {
        return
      }
      if ((vm.listType === 'picture' ||
           vm.listType === 'picture-card' ||
           vm.listType === 'picture-single') &&
          /^image\//.test(file.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          transfer.url = e.target.result
        }
      }
      let upload = new FileUpload(action, file, {
        name: vm.name,
        data: vm.data
      })
      transfer.status = 'uploading'
      vm.$emit('input', vm.transferList)
      upload.onLoad = vm.handleUploadLoad
      upload.onError = vm.handleUploadError
      upload.onProgress = vm.handleUploadProgress
    },

    handleFileChange (event) {
      const vm = this
      let target = event.target
      let files = target.files
      for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i]
        if (vm.beforeUpload) {
          let beforeResult = vm.beforeUpload(file)
          if (!beforeResult) {
            return
          }
        }
        let id = uuid.v1()
        if (vm.compress && /^image\//.test(file.type)) { // 如果设置需要压缩，且类型是图片，执行压缩
          compressFile(file, {
            success: function (newFile) {
              let transfer = {
                id,
                name: newFile.name,
                size: newFile.size,
                status: 'beforeUpload',
                progress: 0,
                raw: newFile
              }
              if (vm.listType === 'picture-single') {
                vm.transferList = [transfer]
              } else {
                vm.transferList.push(transfer)
              }
              vm.$emit('input', vm.transferList)
              vm.upload(vm.action, newFile)
            }
          })
        } else { // 直接上传
          let transfer = {
            id,
            name: file.name,
            size: file.size,
            status: 'beforeUpload',
            progress: 0,
            raw: file
          }
          if (vm.listType === 'picture-single') {
            vm.transferList = [transfer]
          } else {
            vm.transferList.push(transfer)
          }
          vm.$emit('input', vm.transferList)
          vm.upload(vm.action, file)
        }
      }
    },

    handleItemPreview (transfer) {
      if (transfer.status !== 'uploading') {
        this.$emit('preview', transfer)
      }
    },

    handleItemDelete (transfer) {
      let index = this.transferList.indexOf(transfer)
      this.transferList.splice(index, 1)
      this.$emit('input', this.transferList)
      this.$emit('delete', transfer, this.transferList)
    }
  }
}
</script>
