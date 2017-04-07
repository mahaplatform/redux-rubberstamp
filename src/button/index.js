import { Factory } from '../component'
import reducer from './reducer'
import component from './button'
import * as actions from './actions'

export const [ Button, Reducer ] = Factory('one.two.button', component, reducer, actions)
