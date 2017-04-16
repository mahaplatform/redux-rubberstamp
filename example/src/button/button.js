import React from 'react'

class Button extends React.Component {

  static propTypes = {
    clicked: React.PropTypes.number,
    onDecrease: React.PropTypes.func,
    onIncrease: React.PropTypes.func
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

export default Button
