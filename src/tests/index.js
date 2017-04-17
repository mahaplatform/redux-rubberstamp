import { expect } from 'chai'
import reducer from '../reducer'
import * as actionTypes from '../action_types'

const testReducer = (state, action) => {
  return { bar: 'baz' }
}

describe('reducer', () => {

  it('return default values', () => {

      const action = {
        type: actionTypes.ADD,
        cid: 'a1b2',
        namespace: 'foo'
      }

      const state = reducer({ 'foo': testReducer })(undefined, action)

      expect(state).to.be.eql({ foo: { a1b2: { bar: 'baz' } } })

  })

})
