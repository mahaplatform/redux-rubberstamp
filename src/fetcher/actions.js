import * as actionTypes from './action_types'

export const fetch = (method, endpoint) => ({
  type: 'api/REQUEST',
  method,
  endpoint,
  request: actionTypes.FETCH_REQUEST,
  success: actionTypes.FETCH_SUCCESS,
  failure: actionTypes.FETCH_FAILURE
})
