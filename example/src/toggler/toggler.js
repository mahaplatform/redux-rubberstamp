import React from 'react'
import PropTypes from 'prop-types'

class Toggler extends React.Component {

  static propTypes = {
    on: PropTypes.bool,
    onToggle: PropTypes.func
  }

  render() {
    const { on } = this.props
    const btnClass = (on) ? 'btn btn-success' : 'btn btn-danger'
    const text = (on) ? 'ON' : 'OFF'
    return <button className={ btnClass } onClick={ this._handleClick.bind(this) }>{ text }</button>
  }

  _handleClick() {
    this.props.onToggle()
  }

}

export default Toggler
