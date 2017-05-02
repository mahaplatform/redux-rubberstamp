import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import fetcher from './fetcher'
import * as actions from './actions'

export default Factory({
  namespace: 'platform.components.fetcher',
  component: fetcher,
  reducer,
  actions
})
