import * as actionTypes from './action_types'

export const add = (namespace, cid) => ({
  type: actionTypes.ADD_COMPONENT,
  namespace,
  ...(cid) ? { cid } : {}
})

export const remove = (namespace, cid) => ({
  type: actionTypes.REMOVE_COMPONENT,
  namespace,
  ...(cid) ? { cid } : {}
})
