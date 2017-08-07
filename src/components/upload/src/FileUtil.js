/**
 * base64 dataURI 转换为 blob 对象
 * @param {String} dataURI
 */
function dataURL2File (dataURI, name) {
  var byteStr
  var intArray
  var ab
  var i
  var mimetype
  var parts

  parts = dataURI.split(',')
  parts[1] = parts[1].replace(/\s/g, '')

  if (~parts[0].indexOf('base64')) {
    byteStr = window.atob(parts[1])
  } else {
    byteStr = decodeURIComponent(parts[1])
  }

  ab = new ArrayBuffer(byteStr.length)
  intArray = new Uint8Array(ab)

  for (i = 0; i < byteStr.length; i++) {
    intArray[i] = byteStr.charCodeAt(i)
  }

  mimetype = parts[0].split(':')[1].split(';')[0]

  return new window.File([ab], name, {
    type: mimetype
  })
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
      let blob = dataURL2File(img.src, file.name)
      _options.success(blob)
    } else { // 如果图片宽度大于临界值，先压缩尺寸，再压缩质量
      let width = _options.maxWidth
      let height = img.height * (_options.maxWidth / img.width)
      canvas.height = height
      canvas.width = width
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      let imgDataURL = canvas.toDataURL(file.type, _options.ratio)
      let blob = dataURL2File(imgDataURL, file.name)
      _options.success(blob)
    }
  }
}

export {
  compressFile
}
