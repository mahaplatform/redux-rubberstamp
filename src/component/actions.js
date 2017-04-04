import * as actionTypes from './action_types'

export const add = (namespace, cid) => {
  return {
    type: actionTypes.ADD,
    namespace,
    cid
  }
}

export const remove = (namespace, cid) => {
  return {
    type: actionTypes.REMOVE,
    namespace,
    cid
  }
}
