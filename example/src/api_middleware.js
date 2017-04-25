import _ from 'lodash'
import qs from 'qs'
import rest from './rest'

export default store => next => action => {

  const [string, namespace, type] = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/)

  if(type !== 'API_REQUEST') {
    return next(action)
  }

  const params = action.params || {}

  const token = action.token || params.token

  const headers = {
    'Content-Type': 'application/json',
    ...action.headers ? action.headers : {}
  }

  const method = action.method.toUpperCase() || 'GET'

  const path = (action.params && method === 'GET') ? `${action.endpoint}?${qs.stringify(options.params)}` : action.endpoint

  const entity = (action.params && method !== 'GET') ? action.params : null

  const request = _.omitBy({ headers, method, path, entity }, _.isNil)

  store.dispatch({
    type: `${namespace}/${action.request}`,
    cid: action.cid,
    request
  })

  const success = (json) => {

    store.dispatch({
      type: `${namespace}/${action.success}`,
      cid: action.cid,
      ...action.meta,
      ...json
    })

  }

  const failure = (response) => {

    store.dispatch({
      type: `${namespace}/${action.failure}`,
      cid: action.cid,
      ...action.meta,
      ...response.entity
    })

  }

  return rest({ headers, method, path, entity }).then(response => response.entity).then(success, failure)

}
