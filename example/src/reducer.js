import { combineReducers } from 'redux-rubberstamp'
import { Reducer as Button } from './button'
import { Reducer as Fetcher } from './fetcher'
import { Reducer as Toggler } from './toggler'

export default combineReducers([
  Button,
  Fetcher,
  Toggler
])
