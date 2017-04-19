import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'
import reducer from './reducer'
import api_middleware from './api_middleware'

const Component = (namespace, mapStateToProps, mapDispatchToProps, multiple) => {

  return (WrappedComponent) => {

    class Component extends React.Component {

      constructor(props) {
        super(props)
        this.cid = _.random(100000, 999999).toString(36)
      }

      render() {
        const Wrapped = connect(this._mapStateToProps, this._mapDispatchToProps())(WrappedComponent)
        return <Wrapped {...this.props} />
      }

      componentDidMount() {
        const args = multiple ? [ namespace, this.cid ] : [ namespace ]
        this.props.onAdd(...args)
      }

      componentWillUnmount() {
        const args = multiple ? [ namespace, this.cid ] : [ namespace ]
        this.props.onRemove(...args)
      }

      _mapStateToProps = state => {
        const path = multiple ? `${namespace}.${this.cid}` : namespace
        const cstate = _.get(state, path)
        return {
          ...cstate ? mapStateToProps(cstate) : {}
        }
      }

      _mapDispatchToProps = () => {
        const cid = this.cid
        return Object.keys(mapDispatchToProps).reduce((mapped, key) => ({
         ...mapped,
         [key]: function() {

           const action = mapDispatchToProps[key](...Array.prototype.slice.call(arguments))

           if(action.type === 'API_REQUEST') {
             return {
               ...action,
               namespace,
               ...(multiple) ? { cid } : {}
             }
           }

           return {
             ...action,
             type: `${namespace}/${action.type}`,
             ...(multiple) ? { cid } : {}
           }

         }
        }), {})
      }

    }

    const componentMapDispatchToProps = {
      onAdd: actions.add,
      onRemove: actions.remove
    }

    return connect(null, componentMapDispatchToProps)(Component)

  }

}

const Builder = (namespace, component, reducer, actions, multiple) => {

  const mapStateToProps = state => state

  const mapDispatchToProps = Object.keys(actions).reduce((props, action) => ({
    ...props,
    [`on${_.capitalize(action)}`]: actions[action]
  }), {})

  const NamespacedComponent = Component(namespace, mapStateToProps, mapDispatchToProps, reducer, multiple)(component)

  NamespacedComponent.reducer = {
    namespace,
    'function': reducer
  }

  return NamespacedComponent

}

export const Factory = (namespace, component, reducer, actions) => {

  return Builder(namespace, component, reducer, actions, true)

}

export const Singleton = (namespace, component, reducer, actions) => {

  return Builder(namespace, component, reducer, actions, false)

}

export const apiMiddleware = api_middleware

export const combineReducers = (components) => {
  return reducer(components.reduce((reducers, component) => ({
    ...reducers,
    [component.reducer.namespace]: component.reducer.function
  }), {}))
}
