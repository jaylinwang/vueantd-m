let hiddenTextarea

const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`

const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
]

/**
 * 计算隐藏节点样式
 * @param {Object} node
 */
let calculateNodeStyling = function (node) {
  const style = window.getComputedStyle(node)
  const boxSizing = style.getPropertyValue('box-sizing')
  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))
  )
  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))
  )
  const contextStyle = CONTEXT_STYLE
    .map((name) => {
      return `${name}:${style.getPropertyValue(name)}`
    }).join(';')

  return {
    contextStyle,
    paddingSize,
    borderSize,
    boxSizing
  }
}

/**
 * 计算目标textarea的高度
 * @param {Object} targetNode 目标Textarea
 * @param {Number} minRows 最小行数
 * @param {Number} maxRows 最大行数
 */
let calcTextareaHeight = function (targetNode, minRows = null, maxRows = null) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea')
    document.body.appendChild(hiddenTextarea)
  }

  let {
    paddingSize,
    borderSize,
    boxSizing,
    contextStyle
  } = calculateNodeStyling(targetNode)

  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`)
  hiddenTextarea.value = targetNode.value || targetNode.placeholder || ''

  let height = hiddenTextarea.scrollHeight

  if (boxSizing === 'border-box') {
    height = height + borderSize
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize
  }

  hiddenTextarea.value = ''
  let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize

  if (minRows !== null) {
    let minHeight = singleRowHeight * minRows
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize
    }
    height = Math.max(minHeight, height)
  }
  if (maxRows !== null) {
    let maxHeight = singleRowHeight * maxRows
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize
    }
    height = Math.min(maxHeight, height)
  }

  return {
    height: height + 'px'
  }
}

export default calcTextareaHeight
