import { expect } from 'chai'
import * as actions from '../actions'

describe('actions', () => {

  it('adds component without cid', () => {

    const expected = {
      type: 'ADD_COMPONENT',
      namespace: 'one.two.three'
    }

    expect(actions.add('one.two.three')).to.be.eql(expected)

  })

  it('adds component with cid', () => {

    const expected = {
      type: 'ADD_COMPONENT',
      namespace: 'one.two.three',
      cid: 'ay4n'
    }

    expect(actions.add('one.two.three', 'ay4n')).to.be.eql(expected)

  })

  it('removes component without cid', () => {

    const expected = {
      type: 'REMOVE_COMPONENT',
      namespace: 'one.two.three'
    }

    expect(actions.remove('one.two.three')).to.be.eql(expected)

  })

  it('removes component with cid', () => {

    const expected = {
      type: 'REMOVE_COMPONENT',
      namespace: 'one.two.three',
      cid: 'ay4n'
    }

    expect(actions.remove('one.two.three', 'ay4n')).to.be.eql(expected)

  })


})
