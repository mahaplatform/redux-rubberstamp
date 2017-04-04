import _ from 'lodash'
import * as actionTypes from './action_types'

export default (reducers) => {

  return (state, action) => {

    if(state === undefined) {

      return Object.keys(reducers).reduce((branches, branch) => {
        return {
          ...branches,
          [branch]: {}
        }
      }, {})

    } else if(action.type === actionTypes.ADD) {

      return {
        ...state,
        [action.namespace]: {
          ...state[action.namespace],
          [action.cid]: reducers[action.namespace](undefined, action)
        }
      }

    } else if(action.type === actionTypes.REMOVE) {

      return  {
        ...state,
        [action.namespace]: _.omit(state[action.namespace], action.cid)
      }

    } else {

      const namespace = action.type.split('/')[0]

      return {
        ...state,
        [namespace]: {
          ...state[namespace],
          [action.cid]: reducers[namespace](state[namespace][action.cid], action)
        }
      }

    }

  }

}
