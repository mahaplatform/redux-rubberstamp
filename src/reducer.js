import component from './component/reducer'

import button from './button/reducer'
import toggler from './toggler/reducer'

export default component({
  'platform.button': button,
  'platform.toggler': toggler
})
