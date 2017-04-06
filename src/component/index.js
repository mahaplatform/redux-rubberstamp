import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'

export const Component = (namespace, mapStateToProps, mapDispatchToProps, multiple) => {

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
        if(!multiple) return mapDispatchToProps
        const cid = this.cid
        return Object.keys(mapDispatchToProps).reduce((mapped, key) => ({
         ...mapped,
         [key]: function() {
           const action = mapDispatchToProps[key](...Array.prototype.slice.call(arguments))
           return {
             ...action,
             cid
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

export const Factory = (namespace, mapStateToProps, mapDispatchToProps) => {
  return Component(namespace, mapStateToProps, mapDispatchToProps, true)
}

export const Singleton = (namespace, mapStateToProps, mapDispatchToProps) => {
  return Component(namespace, mapStateToProps, mapDispatchToProps, false)
}
