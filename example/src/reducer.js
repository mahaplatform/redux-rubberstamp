import { combineReducers } from 'redux-rubberstamp'
import Button from './button'
import Fetcher from './fetcher'
import Toggler from './toggler'

export default combineReducers([
  Button,
  Fetcher,
  Toggler
])
