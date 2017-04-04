import * as actionTypes from './action_types'

export const increase = () => {
  return {
    type: actionTypes.INCREASE
  }
}

export const decrease = () => {
  return {
    type: actionTypes.DECREASE
  }
}
