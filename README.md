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

```javascript
import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import component from './button'
import * as actions from './actions'

export const [ Button, Reducer ] = Factory('button', component, reducer, actions)
```
