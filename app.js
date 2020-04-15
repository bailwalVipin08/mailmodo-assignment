const express = require('express')
const courseRouter = require('./routes/courseRoutes')
const app = express()

app.use(express.json()) // express built in middleware to work with json req/res
app.use('/api/courses', courseRouter)

module.exports = app
