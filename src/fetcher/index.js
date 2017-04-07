import { Factory } from '../component'
import reducer from './reducer'
import Component from './fetcher'
import * as actions from './actions'

export const [ Fetcher, Reducer ] = Factory('one.fetcher', Component, reducer, actions)
