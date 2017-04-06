import component from './component/reducer'

import Button from './button'
import Fetcher from './fetcher'
import toggler from './toggler/reducer'

export default component({
  ...Button.Reducer,
  ...Fetcher.Reducer,
  'platform.toggler': toggler
})
