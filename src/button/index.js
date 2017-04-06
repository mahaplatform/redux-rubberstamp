import React from 'react'
import Component from '../component'
import * as actions from './actions'

class Button extends React.Component {

  static propTypes = {
    clicked: React.PropTypes.number,
    onClick: React.PropTypes.func
  }

  render() {
    const { clicked } = this.props
    return (
      <div className="btn-group" role="group">
        <button className="btn btn-danger" onClick={ this._handleDecrease.bind(this) }>-</button>
        <button className="btn btn-default" >{ clicked }</button>
        <button className="btn btn-danger" onClick={ this._handleIncrease.bind(this) }>+</button>
      </div>

    )
  }

  _handleDecrease() {
    this.props.onDecrease()
  }

  _handleIncrease() {
    this.props.onIncrease()
  }

}

const mapStateToProps = state => ({
  clicked: state.clicked
})

const mapDispatchToProps = {
  onDecrease: actions.decrease,
  onIncrease: actions.increase
}

export default Component('platform.button', mapStateToProps, mapDispatchToProps)(Button)
