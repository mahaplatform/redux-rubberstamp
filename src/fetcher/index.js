import { Factory } from '../component'
import reducer from './reducer'
import component from './fetcher'
import * as actions from './actions'

export const [ Fetcher, Reducer ] = Factory('platform.components.fetcher', component, reducer, actions)
