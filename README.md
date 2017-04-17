# redux-rubberstamp
Pattern for hosting multiple versions of a component tree inside the main state tree


## Installation
Install with [npm](http://npmjs.com) or [yarn](https://yarnpkg.com):

```sh
npm install --save redux-rubberstamp
```

## Usage
Using redux-rubberstamp in your application is easy:

index.js
```javascript
import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import component from './button'
import * as actions from './actions'

export const [ Button, Reducer ] = Factory('button', component, reducer, actions)
```
