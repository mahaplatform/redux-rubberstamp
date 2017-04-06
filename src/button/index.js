import { Factory } from '../component'
import reducer from './reducer'
import Button from './button'
import * as actions from './actions'

export default Factory('Button', 'one.two.button', Button, reducer, actions)
