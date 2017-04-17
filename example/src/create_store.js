import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { apiMiddleware } from 'redux-rubberstamp'

const CreateStore = (reducer) => {

  const loggerMiddleware = createLogger()

  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    apiMiddleware
  )(createStore)

  return createStoreWithMiddleware(reducer)

}

export default CreateStore
