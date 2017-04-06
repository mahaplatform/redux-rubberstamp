import React from 'react'
import Button from './button'
import Toggler from './toggler'
import Fetcher from './fetcher'

class Canvas extends React.Component {

  render() {
    return (
      <div className="container text-center">
        <div><Button /></div>
        <div><Button /></div>
        <div><Fetcher method="get" endpoint="/foo" /></div>
        <div><Fetcher method="get" endpoint="/bar" /></div>
        <div><Fetcher method="get" endpoint="/baz" /></div>
        <div><Toggler /></div>
      </div>
    )
  }

}

export default Canvas
