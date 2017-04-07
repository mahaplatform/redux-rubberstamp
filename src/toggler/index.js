import { Singleton } from '../component'
import reducer from './reducer'
import Component from './toggler'
import * as actions from './actions'

export const [ Toggler, Reducer ] = Singleton('one.two.three.toggler', Component, reducer, actions)
