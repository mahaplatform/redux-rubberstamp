import { hot } from 'react-hot-loader'
import Canvas from './canvas'
import React from 'react'
import Root from './root'

class App extends React.Component {

  render() {
    return (
      <Root>
        <Canvas />
      </Root>
    )
  }

}

export default hot(module)(App)
