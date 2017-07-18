import Menu from './src/menu.vue'
import Submenu from './src/submenu.vue'
import MenuItem from './src/menu-item.vue'

const install = (Vue) => {
  Vue.component(Menu.name, Menu)
  Vue.component(Submenu.name, Submenu)
  Vue.component(MenuItem.name, MenuItem)
}

export {
  Menu,
  Submenu,
  MenuItem
}

export default {
  install
}
