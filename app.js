const express = require('express')

const app = express()

app.use(express.json()) // express built in middleware to work with json req/res
app.get('/api/courses', (req, res) => {
  res.status(200).json({
      status: 'working...'
  })
})

module.exports = app
