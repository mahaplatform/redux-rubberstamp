export const addComponent = (namespace, cid) => ({
  type: 'ADD_COMPONENT',
  namespace,
  ...(cid) ? { cid } : {}
})

export const removeComponent = (namespace, cid) => ({
  type: 'REMOVE_COMPONENT',
  namespace,
  ...(cid) ? { cid } : {}
})
