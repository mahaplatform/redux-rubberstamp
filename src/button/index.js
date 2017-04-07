import { Factory } from '../component'
import reducer from './reducer'
import Component from './button'
import * as actions from './actions'

export const [ Button, Reducer ] = Factory('one.two.button', Component, reducer, actions)
