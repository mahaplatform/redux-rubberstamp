import React from 'react'
import Button from './button'
import Toggler from './toggler'

class Canvas extends React.Component {

  render() {
    return (
      <div className="container text-center">
        <div><Button /></div>
        <div><Button /></div>
        <div><Toggler /></div>
      </div>
    )
  }

}

export default Canvas
