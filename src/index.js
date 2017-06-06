import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'
import reducer from './reducer'

const Component = (namespace, mapStateToProps, mapDispatchToProps, multiple) => {

  return (WrappedComponent) => {

    class Component extends React.Component {

      static contextTypes = {
        router: PropTypes.object,
        admin: PropTypes.object
      }

      constructor(props) {
        super(props)
        this.state = {
          show: false
        }
        this.cid = _.random(100000, 999999).toString(36)
        this.wrapped = connect(this._mapStateToProps, this._mapDispatchToProps())(WrappedComponent)
      }

      render() {
        const con = this.context
        return this.state.show ? <this.wrapped con={ con } { ...this.props } /> : null
      }

      componentDidMount() {
        const args = multiple ? [ namespace, this.cid ] : [ namespace ]
        this.props.onAdd(...args)
        this.setState({ show: true })
      }

      componentWillUnmount() {
        if(multiple) this.props.onRemove(namespace, this.cid)
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

    return connect(null, componentMapDispatchToProps, null, { pure: false })(Component)

  }

}

const Builder = ({ namespace, component, reducer, selectors, actions, multiple }) => {

  const mapStateToProps = state => ({
    ...state,
    ...selectors ? Object.keys(selectors).reduce((selecedState, key) => ({
      ...selecedState,
      [key]: selectors[key](state)
    }), {}) : {}
  })

  const mapDispatchToProps = Object.keys(actions).reduce((props, action) => ({
    ...props,
    [`on${_.upperFirst(action)}`]: actions[action]
  }), {})

  const NamespacedComponent = Component(namespace, mapStateToProps, mapDispatchToProps, multiple)(component)

  NamespacedComponent.reducer = {
    namespace,
    'function': reducer
  }

  return NamespacedComponent

}

export const Factory = (options) => {

  return Builder({
    ...options,
    multiple: true
  })

}

export const Singleton = (options) => {

  return Builder({
    ...options,
    multiple: false
  })

}

export const combineReducers = (components) => {

  return reducer(components.reduce((reducers, component) => {

    if(!component.reducer || !component.reducer.namespace) return reducers

    return {
      ...reducers,
      [component.reducer.namespace]: component.reducer.function
    }

  }, {}))

}
