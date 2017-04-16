import _ from 'lodash'
import qs from 'qs'
import rest from './rest'
import local from './local'

export default store => next => action => {

  const [ namespace, action_type ] = action.type.split('/')

  if(action_type !== 'API_REQUEST') {
    return next(action)
  }

  return local.getItem('teams', (err, teams) => {

    const activeTeam = teams.reduce((active, team) => {
      return (team.active) ? team : active
    }, null)

    const params = action.params || {}

    const token = action.token || params.token || activeTeam.token

    const headers = {
      'Content-Type': 'application/json',
      ...token ? { 'Authorization': `Bearer ${token}` }: {}
    }

    const method = action.method.toUpperCase() || 'GET'

    const path = (action.params && method === 'GET') ? `/api${action.endpoint}?${qs.stringify(options.params)}` : `/api${action.endpoint}`

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

      if(response.status.code == 401) {

        return store.dispatch({
          type: 'platform.admin/REMOVE_ALL_TEAMS'
        })

      }

      store.dispatch({
        type: `${namespace}/${action.failure}`,
        cid: action.cid,
        ...action.meta,
        ...response.entity
      })

    }

    return rest({ headers, method, path, entity }).then(response => response.entity).then(success, failure)

  })

}
