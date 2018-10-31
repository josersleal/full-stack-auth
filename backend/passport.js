const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const opts = {}
const User = mongoose.model('user')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'

module.exports = (passport) => {
  passport.use(
    new JWTStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, false)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  )
}
