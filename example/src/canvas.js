import React from 'react'
import Button from './button'
import Fetcher from './fetcher'
import Toggler from './toggler'

class Canvas extends React.Component {

  render() {
    return (
      <div className="container text-center">
        <div><Button /></div>
        <div><Button /></div>
        <div><Fetcher method="get" endpoint="/api/foo" /></div>
        <div><Fetcher method="get" endpoint="/api/bar" /></div>
        <div><Fetcher method="get" endpoint="/api/baz" /></div>
        <div><Toggler /></div>
      </div>
    )
  }

}

export default Canvas
