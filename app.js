const express = require('express')
const morgan = require('morgan')

const courseRouter = require('./routes/courseRoutes')
const app = express()

//enable logging only in the development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json()) // express built in middleware to work with json req/res
app.use('/api/courses', courseRouter)

module.exports = app
