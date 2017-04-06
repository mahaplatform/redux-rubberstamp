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

    } else {

      const [ namespace, action_type ] = action.type.split('/')

      const path = action.cid ? `${namespace}.${action.cid}` : namespace

      const caction = {
        ...action,
        type: action_type
      }

      if(!reducers[namespace]) {
        return state
      }

      return {
        ..._.set(state, path, reducers[namespace](_.get(state, path), caction))
      }

    }

  }

}
