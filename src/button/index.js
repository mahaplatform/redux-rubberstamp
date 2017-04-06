import Component from '../component'
import reducer from './reducer'
import Button from './button'
import * as actions from './actions'

export default Component('Button', 'platform.button', Button, reducer, actions)
