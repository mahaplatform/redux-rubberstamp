import React from 'react'
import { Singleton } from '../component'
import * as actions from './actions'

class Toggler extends React.Component {

  static propTypes = {
    on: React.PropTypes.bool,
    onToggle: React.PropTypes.func
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

const mapStateToProps = state => ({
  on: state.on
})

const mapDispatchToProps = {
  onToggle: actions.toggle
}

export default Singleton('platform.toggler', mapStateToProps, mapDispatchToProps)(Toggler)
