import { Singleton } from '../component'
import reducer from './reducer'
import component from './toggler'
import * as actions from './actions'

export const [ Toggler, Reducer ] = Singleton('one.two.three.toggler', component, reducer, actions)
