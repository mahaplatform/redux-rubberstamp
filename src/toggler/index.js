import { Singleton } from '../component'
import reducer from './reducer'
import Toggler from './toggler'
import * as actions from './actions'

export default Singleton('Toggler', 'one.two.three.toggler', Toggler, reducer, actions)
