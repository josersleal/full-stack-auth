const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

const User = require('../model/User')

router.post('/register', (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({
    email: req.body.email
  }).then((user) => {
    if (user) {
      return req.status(400)
        .json({
          email: 'Email allready exists!'
        })
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      const newUser = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        avatar
      })
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log('error :', err)
        } else {
          (
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                console.log('error :', err)
              } else {
                newUser.password = hash
                newUser
                  .save()
                  .then((user) => {
                    res.json(user)
                  })
              }
            })
          )
        }
      })
    }
  })
})
router.post('/login', (req, res) => {
  const {
    errors,
    isValid
  } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password
  User.findOne({
    email
  }).then((user) => {
    if (!user) {
      errors.email = 'User not found'
      return req.status(404)
        .json(errors)
    } else {
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }
            jwt.sign(payload, 'secret', {
              expires: 3600
            },
            (err, token) => {
              if (err) {
                console.log('err :', err)
              } else {
                res.json({
                  sucess: true,
                  token: 'Bearer ' + token
                })
              }
            }
            )
          } else {
            errors.password = 'Incorrect password'
            return res.status(400).json(errors)
          }
        })
    }
  })
})

router.get('/me', passport.authenticate('jwt', {
  session: false
}, (req, res) => {
  return res.json({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email
  })
}))

module.exports = router
