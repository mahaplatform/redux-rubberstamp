import { expect } from 'chai'
import reducer from '../reducer'

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

  describe('factory componet', () => {

    it('can add component', () => {

        const action = {
          type: 'ADD_COMPONENT',
          cid: 'a1b2',
          namespace: 'one.two.three'
        }

        const state = combined(undefined, action)

        expect(state).to.be.eql({ one: { two: { three: { a1b2: { foo: 'bar' } } } } })

    })

    it('can remove component', () => {

        const state1 = { one: { two: { three: { a1b2: { foo: 'bar' } } } } }

        const action = {
          type: 'REMOVE_COMPONENT',
          cid: 'a1b2',
          namespace: 'one.two.three'
        }

        const state2 = combined(state1, action)

        expect(state2).to.be.eql({ one: { two: { three: {} } } })

    })

    it('can mutate component', () => {

      const state1 = combined(undefined, { type: 'ADD_COMPONENT', namespace: 'one.two.three', cid: 'a1b2' })

      const state2 = combined(state1, { type: 'ADD_COMPONENT', namespace: 'one.two.three', cid: 'bz45' })

      const action = {
        type: 'one.two.three/change',
        cid: 'bz45',
        value: 'baz'
      }

      const state3 = combined(state2, action)

      expect(state3).to.be.eql({ one: { two: { three: { a1b2: { foo: 'bar' }, bz45: { foo: 'baz' } } } } })

    })

  })

  describe('singleton componet', () => {

      it('can add component', () => {

          const action = {
            type: 'ADD_COMPONENT',
            namespace: 'one.two.three'
          }

          const state = combined(undefined, action)

          expect(state).to.be.eql({ one: { two: { three: { foo: 'bar' } } } })

      })

      it('can remove component', () => {

          const state1 = { one: { two: { three: { foo: 'bar' } } } }

          const action = {
            type: 'REMOVE_COMPONENT',
            namespace: 'one.two.three'
          }

          const state2 = combined(state1, action)

          expect(state2).to.be.eql({ one: { two: {} } })

      })

      it('can mutate component', () => {

        const state1 = combined(undefined, { type: 'ADD_COMPONENT', namespace: 'one.two.three' })

        const action = {
          type: 'one.two.three/change',
          value: 'baz'
        }

        const state2 = combined(state1, action)

        expect(state2).to.be.eql({ one: { two: { three: { foo: 'baz' } } } })

      })

  })


})
