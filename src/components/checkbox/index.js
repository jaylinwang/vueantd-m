import Checkbox from './src/checkbox.vue'
import CheckboxGroup from './src/checkbox-group.vue'

const install = (Vue) => {
  Vue.component(Checkbox.name, Checkbox)
}

export {
  Checkbox,
  CheckboxGroup
}

export default {
  install
}
