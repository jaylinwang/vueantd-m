import Radio from './src/radio.vue'
import RadioButton from './src/radio-button.vue'
import RadioGroup from './src/radio-group.vue'

const install = (Vue) => {
  Vue.components(Radio.name, Radio)
  Vue.components(RadioButton.name, RadioButton)
  Vue.components(RadioGroup.name, RadioGroup)
}

export {
  Radio,
  RadioGroup,
  RadioButton
}

export default {
  install
}
