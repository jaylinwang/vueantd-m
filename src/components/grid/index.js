import Row from './src/row.vue'
import Col from './src/col.vue'

const install = function (Vue) {
  Vue.component(Row.name, Row)
  Vue.component(Col.name, Col)
}

export {
  Row,
  Col
}

export default {
  install
}
