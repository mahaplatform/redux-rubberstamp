import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'

export default (name, mapStateToProps, mapDispatchToProps) => {

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
        this.props.onAdd(name, this.cid)
      }

      componentWillUnmount() {
        this.props.onRemove(name, this.cid)
      }

      _mapStateToProps = state => ({
        ...(state[name][this.cid]) ? mapStateToProps(state[name][this.cid]) : {},
      })

      _mapDispatchToProps = () => {
        const cid = this.cid
        return Object.keys(mapDispatchToProps).reduce((mapped, key) => ({
         ...mapped,
         [key]: function() {
           return {
             ...mapDispatchToProps[key](...Array.prototype.slice.call(arguments)),
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
