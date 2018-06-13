export const add = (namespace, cid) => ({
  type: 'ADD_COMPONENT',
  namespace,
  ...(cid) ? { cid } : {}
})

export const remove = (namespace, cid) => ({
  type: 'REMOVE_COMPONENT',
  namespace,
  ...(cid) ? { cid } : {}
})
