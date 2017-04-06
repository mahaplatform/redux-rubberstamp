import * as actionTypes from './action_types'

const INITIAL_STATE = {
  on: false
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TOGGLE:
    return {
      on: !state.on
    }

  default:
    return state
  }

}
