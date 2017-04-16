import * as actionTypes from './action_types'

const INITIAL_STATE = {
  status: 'pending',
  text: 'Click'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.FETCH_REQUEST:
    return {
      ...state,
      status: 'loading'
    }

  case actionTypes.FETCH_SUCCESS:
    return {
      ...state,
      status: 'success',
      text: action.data
    }

  case actionTypes.FETCH_FAILURE:
    return {
      ...state,
      status: 'failure',
      text: action.error
    }

  default:
    return state
  }

}
