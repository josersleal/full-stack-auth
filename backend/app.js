const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const config = require('./db')
const users = require('./routes/user')
mongoose
  .connect(
    config.DB,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log('Database is connected')
    },
    (err) => {
      console.log('Can not connect to the database' + err)
    }
  )

const app = express()
app.use(passport.initialize())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/users', users)
app.get('/', (req, res, next) => {
  res.send('hello')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('App listening on port ', PORT)
})