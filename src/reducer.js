import { combineReducers } from './component'
import { Reducer as Button } from './button'
import { Reducer as Fetcher } from './fetcher'
import { Reducer as Toggler } from './toggler'

export default combineReducers([
  Button,
  Fetcher,
  Toggler
])
