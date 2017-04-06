import * as actionTypes from './action_types'

export const add = (namespace, cid) => ({
  type: actionTypes.ADD,
  namespace,
  ...(cid) ? { cid } : {}
})

export const remove = (namespace, cid) => ({
  type: actionTypes.REMOVE,
  namespace,
  ...(cid) ? { cid } : {}
})
