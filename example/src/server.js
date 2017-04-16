const express = require('express')
const app = express()

app.use(express.static('dist'))

app.get('/api/foo', (req, res) => res.status(200).json({ data: 'foo' }))

app.get('/api/bar', (req, res) => res.status(404).json({ error: 'bar' }))

app.get('/api/baz', (req, res) => res.status(401).json({ error: 'baz' }))

app.listen(8080, () => {
  console.log('Example app listening on port 8080!')
})
