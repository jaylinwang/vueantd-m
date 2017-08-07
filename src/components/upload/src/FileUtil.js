/**
 * base64 dataURI 转换为 blob 对象
 * @param {String} dataURI
 */
function dataURL2Blob (dataURI) {
  let parts = dataURI.split(',')
  let code = window.atob(parts[1])
  let contentType = parts[0].split(';')[0].split(':')[1]
  let buffer = new ArrayBuffer(code.length)
  let uintArray = new Uint8Array(buffer)
  for (var i = 0; i < code.length; i++) {
    uintArray[i] = code.charCodeAt(i)
  }
  var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder
  if (Builder) {
    var builder = new Builder()
    builder.append(buffer)
    return buffer.getBlob()
  } else {
    return new window.Blob([buffer], {
      type: contentType
    })
  }
}

/**
 * 压缩文件
 * @param {File} file 源文件
 * @param {Object} options 压缩配置
 *        success: 压缩成功后的回调,
 *        maxSize: 压缩尺寸零界点，单位b，默认1024 * 250
 *        maxWidth: 压缩宽度，默认1024
 *        ratio: 压缩质量比例，默认0.5
 */
function compressFile (file, options) {
  const img = document.createElement('img')
  const canvas = document.createElement('canvas')
  let _options = Object.assign({
    success: function () {},
    maxSize: 1024 * 250,
    maxWidth: 1024,
    ratio: 0.5
  }, options)
  if (file.size <= _options.maxSize) { // 如果图片大小小于零界值，直接返回文件blob对象
    _options.success(file)
    return
  }
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function (e) {
    img.src = e.target.result
  }
  img.onload = function (e) {
    if (img.width < _options.maxWidth) { // 如果图片宽度小于临界值，只压缩质量
      let blob = dataURL2Blob(img.src)
      _options.success(blob)
    } else { // 如果图片宽度大于临界值，先压缩尺寸，再压缩质量
      let width = _options.maxWidth
      let height = img.height * (_options.maxWidth / img.width)
      canvas.height = height
      canvas.width = width
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      let imgDataURL = canvas.toDataURL(file.type, _options.ratio)
      let blob = dataURL2Blob(imgDataURL)
      _options.success(blob)
    }
  }
}

export {
  compressFile
}
