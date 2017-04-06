import component from './component/reducer'

import button from './button/reducer'
import fetcher from './fetcher/reducer'
import toggler from './toggler/reducer'

export default component({
  'platform.button': button,
  'platform.fetcher': fetcher,
  'platform.toggler': toggler
})
