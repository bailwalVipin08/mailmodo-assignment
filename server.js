const dotenv = require('dotenv')
dotenv.config({ path: './config.env' }) //set the path to configuration file
const app = require('./app') //import express app

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`)
})
