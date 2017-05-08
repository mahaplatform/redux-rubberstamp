import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import Canvas from './canvas'

const main = (
  <Root>
    <Canvas />
  </Root>
)

ReactDOM.render(main, document.getElementById('main'))
