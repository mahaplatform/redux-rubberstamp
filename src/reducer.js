import component from './component/reducer'

import Button from './button'
import Fetcher from './fetcher'
import Toggler from './toggler'

export default component({
  ...Button.Reducer,
  ...Fetcher.Reducer,
  ...Toggler.Reducer
})
