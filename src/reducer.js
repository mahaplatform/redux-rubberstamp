import _ from 'lodash'

export default (reducers) => {

  return (state = {}, action) => {

    if(action.type === 'ADD_COMPONENT') {

      const path = action.cid ? `${action.namespace}.${action.cid}` : action.namespace

      return set(state, path.split('.'), reducers[action.namespace](undefined, action))

    } else if(action.type === 'REMOVE_COMPONENT') {

      const path = action.cid ? `${action.namespace}.${action.cid}` : action.namespace

      return  {
        ..._.omit(state, path)
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

      return set(state, path.split('.'), reducers[namespace](_.get(state, path), caction))

    }

  }

}

const set = (state, parts, value) => {

  const key = parts.shift()

  if(key === undefined) return value

  const nextstate = state[key] || {}

  return {
    ...state,
    [key]: set(nextstate, parts, value)
  }

}
