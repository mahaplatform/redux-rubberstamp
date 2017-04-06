import Component from '../component'
import reducer from './reducer'
import Fetcher from './fetcher'
import * as actions from './actions'

export default Component('Fetcher', 'platform.fetcher', Fetcher, reducer, actions)
