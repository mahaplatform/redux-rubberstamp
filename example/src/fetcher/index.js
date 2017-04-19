import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import component from './fetcher'
import * as actions from './actions'

export default Factory('platform.components.fetcher', component, reducer, actions)
