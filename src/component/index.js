import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'

export default (namespace, mapStateToProps, mapDispatchToProps) => {

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
        this.props.onAdd(namespace, this.cid)
      }

      componentWillUnmount() {
        this.props.onRemove(namespace, this.cid)
      }

      _mapStateToProps = state => {

        const cstate = _.get(state, `${namespace}.${this.cid}`)

        return {
          ...cstate ? mapStateToProps(cstate) : {}
        }

      }

      _mapDispatchToProps = () => {

        const cid = this.cid

        return Object.keys(mapDispatchToProps).reduce((mapped, key) => ({
         ...mapped,
         [key]: function() {

           const singleton = mapDispatchToProps[key](...Array.prototype.slice.call(arguments))

           return {
             ...singleton,
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
