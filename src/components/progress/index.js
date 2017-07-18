import Progress from './src/progress.vue'

const install = (Vue) => {
  Vue.component(Progress.name, Progress)
}

export {
  Progress
}

export default {
  install
}
