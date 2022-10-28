import { connect } from 'react-redux'
import * as actions from './actions'
import PropTypes from 'prop-types'
import reducer from './reducer'
import React from 'react'
import _ from 'lodash'

const Rubberstamped = (namespace, mapStateToProps, mapDispatchToProps, multiple) => {

  return (Component) => {

    const _mapStateToProps = (state, props) => {
      const { cid  } = props
      const path = multiple ? `${namespace}.${cid}` : namespace
      const cstate = _.get(state, path)
      return cstate ? mapStateToProps(cstate, props) : {}
    }

    const _mapDispatchToProps = (dispatch, props) => {
      const { cid  } = props
      return Object.keys(mapDispatchToProps).reduce((mapped, key) => ({
        ...mapped,
        [key]: function() {
          const args = Array.prototype.slice.call(arguments)
          const action = mapDispatchToProps[key](...args)
          return dispatch({
            ...action,
            type: `${namespace}/${action.type}`,
            ...(multiple) ? { cid } : {}
          })
        }
      }), {})
    }

    const WrappedComponent = connect(_mapStateToProps, _mapDispatchToProps)(Component)

    class Rubberstamp extends React.Component {

      static propTypes = {
        onAddComponent: PropTypes.func,
        onRemoveComponent: PropTypes.func
      }

      constructor(props) {
        super(props)
        this.state = {
          cid: _.random(100000, 999999).toString(36),
          show: false
        }
      }

      render() {
        if(!this.state.show) return null
        return <WrappedComponent { ...this._getWrapped() } />
      }

      componentDidMount() {
        const { cid } = this.state
        const args = multiple ? [namespace, cid] : [namespace]
        this.props.onAddComponent(...args)
        this.setState({ show: true })
      }

      componentWillUnmount() {
        const { cid } = this.state
        const args = multiple ? [namespace, cid] : [namespace]
        this.setState({ show: false })
        this.props.onRemoveComponent(...args)
      }

      _getWrapped() {
        const { cid } = this.state
        return {
          ..._.omit(this.props, ['onAddComponent','onRemoveComponent']),
          cid
        }
      }

    }

    const componentMapDispatchToProps = {
      onAddComponent: actions.addComponent,
      onRemoveComponent: actions.removeComponent
    }

    return connect(null, componentMapDispatchToProps)(Rubberstamp)

  }

}

const Builder = ({ namespace, component, reducer, selectors, actions, multiple }) => {

  const mapStateToProps = (state, props) => ({
    ...state,
    ...selectors ? Object.keys(selectors).reduce((selecedState, key) => ({
      ...selecedState,
      ..._.isFunction(selectors[key]) ? {
        [key]: selectors[key](state, props)
      } : {}
    }), {}) : {}
  })

  const mapDispatchToProps = Object.keys(actions).reduce((props, action) => ({
    ...props,
    [`on${_.upperFirst(action)}`]: actions[action]
  }), {})

  const NamespacedComponent = Rubberstamped(namespace, mapStateToProps, mapDispatchToProps, multiple)(component)

  NamespacedComponent.reducer = {
    namespace,
    'function': reducer
  }

  return NamespacedComponent

}

export const Factory = (options) => Builder({
  ...options,
  multiple: true
})

export const Singleton = (options) => Builder({
  ...options,
  multiple: false
})

export const combineReducers = (components) => reducer(components.reduce((reducers, component) => {

  if(!component.reducer || !component.reducer.namespace) return reducers

  return {
    ...reducers,
    [component.reducer.namespace]: component.reducer.function
  }

}, {}))
