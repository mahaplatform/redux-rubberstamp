import { expect } from 'chai'
import * as actions from '../actions'
import * as actionTypes from '../action_types'

describe('actions', () => {

  it('adds component without cid', () => {

    const expected = {
      type: actionTypes.ADD,
      namespace: 'one.two.three'
    }

    expect(actions.add('one.two.three')).to.be.eql(expected)

  })

  it('adds component with cid', () => {

    const expected = {
      type: actionTypes.ADD,
      namespace: 'one.two.three',
      cid: 'ay4n'
    }

    expect(actions.add('one.two.three', 'ay4n')).to.be.eql(expected)

  })

  it('removes component without cid', () => {

    const expected = {
      type: actionTypes.REMOVE,
      namespace: 'one.two.three'
    }

    expect(actions.remove('one.two.three')).to.be.eql(expected)

  })

  it('removes component with cid', () => {

    const expected = {
      type: actionTypes.REMOVE,
      namespace: 'one.two.three',
      cid: 'ay4n'
    }

    expect(actions.remove('one.two.three', 'ay4n')).to.be.eql(expected)

  })


})
