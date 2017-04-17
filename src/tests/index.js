import { expect } from 'chai'
import reducer from '../reducer'
import * as actionTypes from '../action_types'

const INITIAL_VALUE = { foo: 'bar' }

const testReducer = (state = INITIAL_VALUE, action) => {

  if(action.type === 'change') {

    return {
      foo: action.value
    }

  } else {

    return state

  }
}

const combined = reducer({ 'one.two.three': testReducer })

describe('reducer', () => {

  it('return default values', () => {

      const action = {
        type: actionTypes.ADD,
        cid: 'a1b2',
        namespace: 'one.two.three'
      }

      const state = combined(undefined, action)

      expect(state).to.be.eql({ one: { two: { three: { a1b2: { foo: 'bar' } } } } })

  })

  it('mutates a singleton component', () => {

    let state = combined(undefined, { type: actionTypes.ADD, namespace: 'one.two.three' })

    const action = {
      type: 'one.two.three/change',
      value: 'baz'
    }

    state = combined(state, action)

    expect(state).to.be.eql({ one: { two: { three: { foo: 'baz' } } } })

  })

  it('mutates the right cid', () => {

    let state = combined(undefined, { type: actionTypes.ADD, namespace: 'one.two.three', cid: 'a1b2' })

    state = combined(state, { type: actionTypes.ADD, namespace: 'one.two.three', cid: 'bz45' })

    const action = {
      type: 'one.two.three/change',
      cid: 'bz45',
      value: 'baz'
    }

    state = combined(state, action)

    expect(state).to.be.eql({ one: { two: { three: { a1b2: { foo: 'bar' }, bz45: { foo: 'baz' } } } } })

  })

})
