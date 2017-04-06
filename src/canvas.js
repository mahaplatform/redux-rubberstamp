import React from 'react'
import Button from './button'
import Toggler from './toggler'

class Canvas extends React.Component {

  render() {
    return (
      <div className="container text-center">
        <div><Button /></div>
        <div><Button /></div>
        <div><Toggler method="get" endpoint="/foo" /></div>
        <div><Toggler method="get" endpoint="/bar" /></div>
        <div><Toggler method="get" endpoint="/baz" /></div>
      </div>
    )
  }

}

export default Canvas
