import React from 'react'
import Button from './button'
import Toggler from './toggler'
import Fetcher from './fetcher'

class Canvas extends React.Component {

  render() {
    return (
      <div className="container text-center">
        <div><Button.Component /></div>
        <div><Button.Component /></div>
        <div><Fetcher.Component method="get" endpoint="/foo" /></div>
        <div><Fetcher.Component method="get" endpoint="/bar" /></div>
        <div><Fetcher.Component method="get" endpoint="/baz" /></div>
        <div><Toggler /></div>
      </div>
    )
  }

}

export default Canvas
