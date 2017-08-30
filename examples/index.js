import Vue from 'vue'
import VueRouter from 'vue-router'
// 开发模式
// import VueWeui from '../src/components'
// import '../src/styles/index.scss'
// import './index.scss'

// 生产模式测试
import VueWeui from '../dist/vueantd-m.js'
import '../dist/styles/vueantd-m.css'

Vue.use(VueRouter)
Vue.use(VueWeui)

const routes = [{
  path: '/',
  component: require('./home/index.vue')
}, {
  path: '/grid',
  component: require('./grid/index.vue')
}, {
  path: '/icon',
  component: require('./icon/index.vue')
}, {
  path: '/button',
  component: require('./button/index.vue')
}, {
  path: '/collapse',
  component: require('./collapse/index.vue')
}, {
  path: '/menu',
  component: require('./menu/index.vue')
}, {
  path: '/progress',
  component: require('./progress/index.vue')
}, {
  path: '/upload',
  component: require('./upload/index.vue')
}, {
  path: '/carousel',
  component: require('./carousel/index.vue')
}, {
  path: '/input',
  component: require('./input/index.vue')
}, {
  path: '/form',
  component: require('./form/index.vue')
}, {
  path: '/modal',
  component: require('./modal/index.vue')
}, {
  path: '/message',
  component: require('./message/index.vue')
}, {
  path: '/masker',
  component: require('./masker/index.vue')
}, {
  path: '/picker',
  component: require('./picker/index.vue')
}, {
  path: '/date-picker',
  component: require('./date-picker/index.vue')
}, {
  path: '/radio',
  component: require('./radio/index.vue')
}, {
  path: '/switch',
  component: require('./switch/index.vue')
}, {
  path: '/checkbox',
  component: require('./checkbox/index.vue')
}]

const router = new VueRouter({
  routes
})

new Vue({
  router
}).$mount('#app')
