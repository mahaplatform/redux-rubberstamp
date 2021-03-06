import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import toggler from './toggler'
import * as actions from './actions'

export default Singleton({
  namespace: 'toggler',
  component: toggler,
  reducer,
  actions
})
