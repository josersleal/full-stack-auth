const Validator = require('validator')
const isEmptyOrNull = require('./empty-or-null')

module.exports = function validateLoginInput (data) {
  let errors = {}
  data.email = !isEmptyOrNull(data.email) ? data.email : ''
  data.password = !isEmptyOrNull(data.password) ? data.password : ''
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have 6 chars'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }
  return {
    errors,
    isValid: isEmptyOrNull(errors)
  }
}
