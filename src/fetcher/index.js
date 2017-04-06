import { Factory } from '../component'
import reducer from './reducer'
import Fetcher from './fetcher'
import * as actions from './actions'

export default Factory('Fetcher', 'one.fetcher', Fetcher, reducer, actions)
