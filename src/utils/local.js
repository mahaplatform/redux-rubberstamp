const localforage = require('localforage')

export default localforage.createInstance({
  name: 'platform',
  storeName: 'cache'
})
