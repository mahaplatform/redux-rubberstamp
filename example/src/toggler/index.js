import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import component from './toggler'
import * as actions from './actions'

export default Singleton('platform.components.toggler', component, reducer, actions)
