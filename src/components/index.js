import { Row, Col } from './grid'
import { Icon } from './icon'
import { Button, ButtonGroup } from './button'
import { Collapse, CollapseItem } from './collapse'
import { Menu, MenuItem, Submenu } from './menu'
import { Progress } from './progress'
import { Upload } from './upload'
import { Carousel, CarouselItem } from './carousel'
import { Input } from './input'
import { Form, FormItem } from './form'
import { Modal, FastModal } from './modal'
import { Message } from './message'
import { Masker } from './masker'

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
  Vue.component(Input.name, Input)
  Vue.component(Form.name, Form)
  Vue.component(FormItem.name, FormItem)
  Vue.component(Modal.name, Modal)
  Vue.component(Masker.name, Masker)

  Vue.prototype.$modal = FastModal
  Vue.prototype.$message = Message
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
  CarouselItem,
  Input,
  Form,
  FormItem,
  Modal,
  FastModal,
  Message,
  Masker
}

export default {
  install
}
