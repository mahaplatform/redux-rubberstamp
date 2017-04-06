import _ from 'lodash'
import * as actionTypes from './action_types'

export default (reducers) => {

  return (state = {}, action) => {

    if(action.type === actionTypes.ADD) {

      return {
        ..._.set(state, `${action.namespace}.${action.cid}`, reducers[action.namespace](undefined, action))
      }

    } else if(action.type === actionTypes.REMOVE) {

      return  {
        ..._.omit(state, `${action.namespace}.${action.cid}`)
      }

    } else if(action.cid) {

      const namespace = action.type.split('/')[0]
      const path = `${namespace}.${action.cid}`

      return {
        ..._.set(state, path, reducers[namespace](_.get(state, path), action))
      }

    } else {

      return state

    }

  }

}
