import React from 'react'
import PropTypes from 'prop-types'

class Fetcher extends React.Component {

  static propTypes = {
    endpoint: PropTypes.string,
    method: PropTypes.string,
    status: PropTypes.string,
    text: PropTypes.string,
    onFetch: PropTypes.func
  }

  render() {
    const { text } = this.props
    const btnClass = this._btnClass()
    return <button className={ btnClass } onClick={ this._handleClick.bind(this) }>{ text }</button>
  }

  _btnClass() {
    const { status } = this.props
    if(status === 'pending') return 'btn btn-default'
    if(status === 'success') return 'btn btn-success'
    if(status === 'failure') return 'btn btn-danger'
  }

  _handleClick() {
    this.props.onFetch(this.props.method, this.props.endpoint)
  }

}

export default Fetcher
