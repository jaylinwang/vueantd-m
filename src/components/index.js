import { Row, Col } from './grid'
import { Icon } from './icon'
import { Button, ButtonGroup } from './button'
import { Collapse, CollapseItem } from './collapse'
import { Menu, MenuItem, Submenu } from './menu'
import { Progress } from './progress'
import { Upload } from './upload'
import { Carousel, CarouselItem } from './carousel'

const install = (Vue) => {
  Vue.component(Row.name, Row)
  Vue.component(Col.name, Col)
  Vue.component(Icon.name, Icon)
  Vue.component(Button.name, Button)
  Vue.component(ButtonGroup.name, ButtonGroup)
  Vue.component(Collapse.name, Collapse)
  Vue.component(CollapseItem.name, CollapseItem)
  Vue.component(Menu.name, Menu)
  Vue.component(MenuItem.name, MenuItem)
  Vue.component(Submenu.name, Submenu)
  Vue.component(Progress.name, Progress)
  Vue.component(Upload.name, Upload)
  Vue.component(Carousel.name, Carousel)
  Vue.component(CarouselItem.name, CarouselItem)
}

export {
  Row,
  Col,
  Icon,
  Button,
  Collapse,
  CollapseItem,
  Menu,
  MenuItem,
  Submenu,
  Progress,
  Upload,
  Carousel,
  CarouselItem
}

export default {
  install
}
