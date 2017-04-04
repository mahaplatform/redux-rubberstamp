import * as actionTypes from './action_types'

const INITIAL_STATE = {
  clicked: 0
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.INCREASE:
    return {
      ...state,
      clicked: Math.min(state.clicked + 1, 9)
    }

  case actionTypes.DECREASE:
    return {
      ...state,
      clicked: Math.max(0, state.clicked - 1)
    }

  default:
    return state
  }

}
