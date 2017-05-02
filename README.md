# redux-rubberstamp
<a href="https://circleci.com/gh/thinktopography/redux-rubberstamp">
  <img src="https://img.shields.io/circleci/project/thinktopography/redux-rubberstamp.svg?maxAge=600" alt="Build Status" >
</a>
<a href="https://codeclimate.com/github/thinktopography/redux-rubberstamp">
  <img src="https://img.shields.io/codeclimate/github/thinktopography/redux-rubberstamp.svg?maxAge=600" alt="Code Climate" />
</a>
<a href="https://codeclimate.com/github/thinktopography/redux-rubberstamp/coverage">
  <img src="https://img.shields.io/codeclimate/coverage/github/thinktopography/redux-rubberstamp.svg?maxAge=600" alt="Code Coverage" />
</a>

Pattern for hosting multiple versions of a component tree inside the main state tree

## Installation
Install with [npm](http://npmjs.com) or [yarn](https://yarnpkg.com):

```sh
npm install --save redux-rubberstamp
```

## Usage
Using redux-rubberstamp in your application is easy:

If you only need one instance of the component in your state tree, you can export
it as a singleton component:
```javascript
import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import button from './button'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'button',
  component: button,
  reducer,
  actions,
  selectors
})
```

If you only need multiple instances of the component in your state tree, you can
export it as a factory component:
```javascript
import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import button from './button'
import * as actions from './actions'
import * as selectors from './selectors'

export default Factory({
  namespace: 'button',
  component: button,
  reducer,
  actions,
  selectors
})
```

When you use the component in your react app, you treat it like any default export:
```javascript
import Button from './components/button'

const () => {
  return <Button />
}
```

In order to manage the master state tree, redux-rubberstamp provides a custom
`combineReducers` function to manage the components place in the state tree:
```javascript
import { combineReducers } from 'redux-rubberstamp'
import Button from './button'

export default combineReducers([
  Button
])
```
