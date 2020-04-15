const dotenv = require('dotenv') //dotenv to setup configuration and environment settings

dotenv.config({ path: './config.env' }) //set the path to configuration file

const app = require('./app') //import express app

const mongoose = require('mongoose')

const port = process.env.PORT || 3000
const DB = process.env.DB_REMOTE //DB_REMOTE refers to my mongoDB atlas database

//connect to mongoDB database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Successfully Connected to Dabatase!')
  })

//start the app
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`)
})
