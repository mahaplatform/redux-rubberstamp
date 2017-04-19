import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import component from './button'
import * as actions from './actions'

export default Factory('platform.components.button', component, reducer, actions)
